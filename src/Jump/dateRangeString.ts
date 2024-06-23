import { useMarkwhenStore } from "@/Markwhen/markwhenStore";
import { dateRangeToString } from "@/Markwhen/utilities/dateTimeUtilities";
import type { DateFormat } from "@markwhen/parser/lib/Types";
import type { ParseResult } from "./jumpStore";

export const useDateRangeString = () => {
  const markwhenStore = useMarkwhenStore();

  return (parseResult: ParseResult) =>
    dateRangeToString(
      parseResult.dateRange,
      parseResult.scale || "day",
      markwhenStore.pageTimeline.header.dateFormat as DateFormat
    );
};
