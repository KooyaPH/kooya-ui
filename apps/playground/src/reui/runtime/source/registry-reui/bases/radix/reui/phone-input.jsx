"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useMemo, useState } from "react";
import * as BasePhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { cn } from "cn";
import { Button } from "../../../../../../adapters/controls.tsx";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxSeparator, ComboboxTrigger, ComboboxValue, } from "../../../../registry/bases/radix/ui/combobox.jsx";
import { Input } from "../../../../../../adapters/controls.tsx";
import { ScrollArea } from "../../../../registry/bases/radix/ui/scroll-area.jsx";
import { IconPlaceholder } from "../../../../../../adapters/icons.tsx";
const PhoneInputContext = createContext({
    variant: "default",
    popupClassName: undefined,
    scrollAreaClassName: undefined,
});
function PhoneInput({ className, variant, popupClassName, scrollAreaClassName, onChange, value, ...props }) {
    const phoneInputSize = variant || "default";
    return (_jsx(PhoneInputContext.Provider, { value: { variant: phoneInputSize, popupClassName, scrollAreaClassName }, children: _jsx(BasePhoneInput.default, { className: cn("flex", props["aria-invalid"] &&
                "[&_*[data-slot=combobox-trigger]]:border-destructive [&_*[data-slot=combobox-trigger]]:ring-destructive/50", className), flagComponent: FlagComponent, countrySelectComponent: CountrySelect, inputComponent: InputComponent, smartCaret: false, value: value || undefined, onChange: (value) => onChange?.(value || ""), ...props }) }));
}
function InputComponent({ className, ...props }) {
    const { variant } = useContext(PhoneInputContext);
    return (_jsx(Input, { className: cn("rounded-s-none focus:z-1", variant === "sm" && "h-7", variant === "lg" && "h-9", className), ...props }));
}
function CountrySelect({ disabled, value: selectedCountry, options: countryList, onChange, }) {
    const { variant, popupClassName } = useContext(PhoneInputContext);
    const [searchValue, setSearchValue] = useState("");
    const filteredCountries = useMemo(() => {
        if (!searchValue)
            return countryList;
        return countryList.filter(({ label }) => label.toLowerCase().includes(searchValue.toLowerCase()));
    }, [countryList, searchValue]);
    return (_jsxs(Combobox, { items: filteredCountries, value: selectedCountry || "", onValueChange: (country) => {
            if (country) {
                onChange(country);
            }
        }, children: [_jsx(ComboboxTrigger, { render: _jsxs(Button, { variant: "outline", size: variant, className: cn("style-vega:rounded-s-md style-nova:rounded-s-lg style-maia:rounded-s-4xl style-lyra:rounded-s-none style-mira:rounded-s-md style-luma:rounded-s-3xl style-rhea:rounded-s-2xl style-sera:rounded-s-none flex gap-1 rounded-e-none border-e-0 px-2.5 py-0 leading-none hover:bg-transparent focus:z-10 data-pressed:bg-transparent", disabled && "opacity-50"), disabled: disabled, children: [_jsx("span", { className: "sr-only", children: _jsx(ComboboxValue, {}) }), _jsx(FlagComponent, { country: selectedCountry, countryName: selectedCountry })] }) }), _jsxs(ComboboxContent, { className: cn("w-xs *:data-[slot=input-group]:bg-transparent", popupClassName), children: [_jsx(ComboboxInput, { placeholder: "e.g. United States", value: searchValue, onChange: (e) => setSearchValue(e.target.value), showTrigger: false, className: "border-input focus-visible:border-border rounded-none border-0 px-0 py-2.5 shadow-none ring-0! outline-none! focus-visible:ring-0 focus-visible:ring-offset-0" }), _jsx(ComboboxSeparator, {}), _jsx(ComboboxEmpty, { className: "px-4 py-2.5 text-sm", children: "No country found." }), _jsx(ComboboxList, { children: _jsx("div", { className: "relative flex max-h-full", children: _jsx("div", { className: "flex max-h-[min(var(--available-height),24rem)] w-full scroll-pt-2 scroll-pb-2 flex-col overscroll-contain", children: _jsx(ScrollArea, { className: "size-full min-h-0 **:data-[slot=scroll-area-scrollbar]:m-0 [&_[data-slot=scroll-area-viewport]]:h-full [&_[data-slot=scroll-area-viewport]]:overscroll-contain", children: filteredCountries.map((item) => item.value ? (_jsxs(ComboboxItem, { value: item.value, className: "flex items-center gap-2", children: [_jsx(FlagComponent, { country: item.value, countryName: item.label }), _jsx("span", { className: "flex-1 text-sm", children: item.label }), _jsx("span", { className: "text-foreground/50 text-sm", children: `+${BasePhoneInput.getCountryCallingCode(item.value)}` })] }, item.value)) : null) }) }) }) })] })] }));
}
function FlagComponent({ country, countryName }) {
    const Flag = flags[country];
    return (_jsx("span", { className: "flex h-4 w-4 items-center justify-center [&_svg:not([class*='size-'])]:size-full! [&_svg:not([class*='size-'])]:rounded-[5px]", children: Flag ? (_jsx(Flag, { title: countryName })) : (_jsx(IconPlaceholder, { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe02Icon", phosphor: "GlobeSimpleIcon", remixicon: "RiGlobalLine", className: "size-4 opacity-60" })) }));
}
export { PhoneInput };
