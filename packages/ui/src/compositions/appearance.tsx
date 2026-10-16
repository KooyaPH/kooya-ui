import { ColorPicker, Radio, Select } from "antd";
import { palettes, type AppearancePreferences } from "../foundations/palettes";
export interface AppearancePickerProps {
  value: AppearancePreferences;
  onChange: (value: AppearancePreferences) => void;
  disabled?: boolean;
}
/** Controlled fields: the adopting product owns save, preview and persistence. */
export function AppearancePicker({
  value,
  onChange,
  disabled,
}: AppearancePickerProps) {
  const change = (patch: Partial<AppearancePreferences>) =>
    onChange({ ...value, ...patch });
  return (
    <div className="ku-appearance-fields">
      <label>
        <span>Palette</span>
        <Select
          aria-label="Workspace palette"
          disabled={disabled}
          value={value.palette}
          onChange={(palette) =>
            change({
              palette,
              ...(palette === "custom" && !value.customAccent
                ? { customAccent: "#45583D" }
                : {}),
            })
          }
          options={[
            ...palettes.map((p) => ({ value: p.id, label: p.name })),
            { value: "custom", label: "Custom accent" },
          ]}
        />
      </label>
      {value.palette === "custom" && (
        <div className="ku-appearance-custom">
          <span>Custom accent</span>
          <ColorPicker
            aria-label="Custom accent color"
            disabled={disabled}
            disabledAlpha
            value={value.customAccent ?? "#45583D"}
            showText
            onChange={(color) =>
              change({ customAccent: color.toHexString().toUpperCase() })
            }
          />
          <p>
            Light and dark variants are adjusted for readable text and controls.
          </p>
        </div>
      )}
      <div>
        <span id="ku-appearance-mode-label">Appearance</span>
        <Radio.Group
          aria-label="Appearance mode"
          disabled={disabled}
          value={value.mode}
          onChange={(e) => change({ mode: e.target.value })}
          options={[
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "system", label: "System" },
          ]}
        />
      </div>
      <label>
        <span>Density</span>
        <Select
          aria-label="Workspace density"
          disabled={disabled}
          value={value.density}
          onChange={(density) => change({ density })}
          options={[
            { value: "compact", label: "Compact" },
            { value: "comfortable", label: "Comfortable" },
          ]}
        />
      </label>
    </div>
  );
}
