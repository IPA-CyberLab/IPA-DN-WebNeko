import { Util } from "./Util";

export class Str
{
    // 文字列を整数にパース
    public static ToInt(str: string): number
    {
        try
        {
            return parseInt(str.trim());
        }
        catch
        {
            return 0;
        }
    }

    // 整数を文字列に変換
    public static ToStr(int: number): string
    {
        return Util.ToInt(int).toString();
    }

    // 整数を 16 進数文字列に変換
    public static To0xHex(int: number, upperCase = true): string
    {
        let str = Util.ToInt(int).toString(16);
        if (upperCase) str = str.toUpperCase();
        return "0x" + str;
    }
}

