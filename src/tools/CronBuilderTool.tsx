"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { trackFlagshipEvent } from "@/lib/analytics/flagship-events";
import {
  buildCronExpression,
  describeCron,
  presetToCron,
  validateCron,
  type CronFields,
  type CronPreset,
} from "@/lib/tools/logic/cron-builder";
import { ToolErrorAlert } from "@/components/tools/ToolErrorAlert";
import { ToolInputPanel } from "@/components/tools/ToolInputPanel";
import { ToolOutputPanel } from "@/components/tools/ToolOutputPanel";
import { ToolSelect } from "@/components/tools/ToolSelect";

export const CronBuilderTool = () => {
  const [preset, setPreset] = useState<CronPreset>("daily-midnight");
  const [fields, setFields] = useState<CronFields>(presetToCron("daily-midnight"));
  const [hasBuilt, setHasBuilt] = useState(false);

  const handlePresetChange = (value: CronPreset) => {
    setPreset(value);
    if (value !== "custom") {
      setFields(presetToCron(value));
    }
  };

  const handleFieldChange = (key: keyof CronFields, value: string) => {
    setPreset("custom");
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const validationError = useMemo(() => validateCron(fields), [fields]);
  const expression = buildCronExpression(fields);
  const description = describeCron(fields);

  const handleBuild = () => {
    setHasBuilt(true);
    trackFlagshipEvent("flagship_calculate", {
      tool_id: "cron-builder",
      tool_category: "developer-tools",
      mode: preset,
    });
  };

  return (
    <div className="space-y-4">
      <ToolInputPanel title="Schedule">
        <ToolSelect label="Preset" id="cron-preset" value={preset} onChange={(e) => handlePresetChange(e.target.value as CronPreset)}>
          <option value="every-minute">Every minute</option>
          <option value="hourly">Hourly</option>
          <option value="daily-midnight">Daily at midnight</option>
          <option value="daily-noon">Daily at noon</option>
          <option value="weekly-monday">Weekly (Monday 9:00)</option>
          <option value="monthly-first">Monthly (1st at 9:00)</option>
          <option value="custom">Custom</option>
        </ToolSelect>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Input label="Minute (0-59)" value={fields.minute} onChange={(e) => handleFieldChange("minute", e.target.value)} placeholder="0" />
          <Input label="Hour (0-23)" value={fields.hour} onChange={(e) => handleFieldChange("hour", e.target.value)} placeholder="9" />
          <Input label="Day of month" value={fields.dayOfMonth} onChange={(e) => handleFieldChange("dayOfMonth", e.target.value)} placeholder="*" />
          <Input label="Month" value={fields.month} onChange={(e) => handleFieldChange("month", e.target.value)} placeholder="*" />
          <Input label="Day of week (0-6)" value={fields.dayOfWeek} onChange={(e) => handleFieldChange("dayOfWeek", e.target.value)} placeholder="*" />
        </div>
        <p className="mt-3 text-xs text-muted">Unix cron format: minute hour day-of-month month day-of-week</p>
        <div className="mt-4">
          <Button type="button" onClick={handleBuild}>Build expression</Button>
        </div>
      </ToolInputPanel>

      {hasBuilt && validationError && <ToolErrorAlert message={validationError} />}

      {hasBuilt && !validationError && (
        <ToolOutputPanel actions={<CopyButton value={expression} label="Copy cron" />}>
          <p className="mb-2 font-mono text-lg">{expression}</p>
          <p className="text-sm text-muted">{description}</p>
        </ToolOutputPanel>
      )}
    </div>
  );
};
