import { toInteger } from "lodash";

export class Util
{
    // 整数を正規化
    public static ToInt(intValue: number): number
    {
        try
        {
            return toInteger(intValue);
        }
        catch
        {
            return 0;
        }
    }

    // デバッグ出力
    public static Debug(object: any): void
    {
        if (object === null) object = "null";
        console.log(object);
    }
}

