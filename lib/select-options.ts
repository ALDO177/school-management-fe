import { OptionSelect } from "@types_local/common";

export const mapSelectOptionToValue = (options : OptionSelect[]) => {
    if(options.length < 1) return;
    return options.map((val) => val.value);
}