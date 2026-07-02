import { useAppSelector } from "../../app/hooks";
import { selectLocale } from "../appFlow/appFlowSlice";
import { localizationData } from "./localizationData";

export function useTranslation() {
  const locale = useAppSelector(selectLocale);

  return {
    locale,
    t: localizationData[locale],
  };
}
