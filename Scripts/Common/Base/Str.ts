// IPA WebNeko
// 
// Copyright (c) 2021- IPA CyberLab.
// All Rights Reserved.
// 
// License: The Apache License, Version 2.0
// https://www.apache.org/licenses/LICENSE-2.0
// 
// THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// 
// THIS SOFTWARE IS DEVELOPED IN JAPAN, AND DISTRIBUTED FROM JAPAN, UNDER
// JAPANESE LAWS. YOU MUST AGREE IN ADVANCE TO USE, COPY, MODIFY, MERGE, PUBLISH,
// DISTRIBUTE, SUBLICENSE, AND/OR SELL COPIES OF THIS SOFTWARE, THAT ANY
// JURIDICAL DISPUTES WHICH ARE CONCERNED TO THIS SOFTWARE OR ITS CONTENTS,
// AGAINST US (IPA CYBERLAB, DAIYUU NOBORI, SOFTETHER VPN PROJECT OR OTHER
// SUPPLIERS), OR ANY JURIDICAL DISPUTES AGAINST US WHICH ARE CAUSED BY ANY KIND
// OF USING, COPYING, MODIFYING, MERGING, PUBLISHING, DISTRIBUTING, SUBLICENSING,
// AND/OR SELLING COPIES OF THIS SOFTWARE SHALL BE REGARDED AS BE CONSTRUED AND
// CONTROLLED BY JAPANESE LAWS, AND YOU MUST FURTHER CONSENT TO EXCLUSIVE
// JURISDICTION AND VENUE IN THE COURTS SITTING IN TOKYO, JAPAN. YOU MUST WAIVE
// ALL DEFENSES OF LACK OF PERSONAL JURISDICTION AND FORUM NON CONVENIENS.
// PROCESS MAY BE SERVED ON EITHER PARTY IN THE MANNER AUTHORIZED BY APPLICABLE
// LAW OR COURT RULE.

// Author: Daiyuu Nobori
// 文字列ライブラリ

import { Util } from "./Util";

export class Str
{
    // 文字列を整数にパース
    public static StrToInt(str: string): number
    {
        try
        {
            const int = parseInt(str.trim());
            if (isNaN(int)) return 0;
            return int;
        }
        catch
        {
            return 0;
        }
    }

    // 整数を文字列に変換
    public static IntToStr(int: number): string
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

    // 文字列化
    public static ToStr(str: any): string
    {
        if (str === null || str === undefined)
        {
            return "";
        }

        if (str instanceof String)
        {
            return str as string;
        }

        return str.toString();
    }

    // 何でも Trim して文字列にする
    public static Trim(str: any): string
    {
        return Str.ToStr(str).trim();
    }

    // 型が string かどうか取得
    public static IsString(object: any): boolean
    {
        if (object === null || object === undefined) return false;
        return (typeof object === "string");
    }

    // 文字列を boolean に変換
    public static ToBool(str: string): boolean
    {
        const int = Str.StrToInt(str);
        if (int !== 0) return true;
        const tmp = Str.Trim(str);
        if (tmp.length >= 1)
        {
            const c = tmp.toLowerCase()[0];
            if (c === 'y' || c === 't')
            {
                return true;
            }
        }

        return false;
    }

    // 文字から ASCII コードを取得する
    public static CharToAscii(char: string): number
    {
        if (!Str.IsString(char)) return 0;
        if (char.length <= 0) return 0;
        return char.charCodeAt(0);
    }

    // ASCII コードを文字に変換する
    public static AsciiToChar(ascii: number): string
    {
        return String.fromCharCode(ascii);
    }

    // 文字列が Null またはゼロ長さかどうか
    public static IsNullOrZeroLen(str: string): boolean
    {
        if (Util.IsNullOrUndefined(str)) return true;
        if (str.length === 0) return true;

        return false;
    }

    // 文字列が空かどうか
    public static IsEmpty(str: string): boolean
    {
        if (Util.IsNullOrUndefined(str)) return true;
        if (str.trim().length === 0) return true;

        return false;
    }
    public static IsFilled(str: string): boolean
    {
        return !Str.IsEmpty(str);
    }

    // Null または Undefined でない文字を返す
    public static NonNull(str: string): string
    {
        if (Str.IsNullOrZeroLen(str)) return "";
        return str;
    }

    // Null または Undefined でない trim() 済み文字を返す
    public static NonNullTrim(str: string): string
    {
        if (Str.IsNullOrZeroLen(str)) return "";
        return str.trim();
    }

    // URL エンコード (Cores の UrlEncode に対応。A-Z a-z 0-9 - _ . ! ~ * ' ( ) 以外をすべてエスケープ)
    public static EncodeUrl(str: string): string
    {
        if (Str.IsNullOrZeroLen(str)) return "";
        return encodeURIComponent(str);
    }

    // URL デコード (Cores の UrlEncode に対応。A-Z a-z 0-9 - _ . ! ~ * ' ( ) 以外をすべてエスケープ)
    public static DecodeUrl(str: string): string
    {
        if (Str.IsNullOrZeroLen(str)) return "";
        return decodeURIComponent(str);
    }

    // 任意の文字列を安全にエンコード
    public static JavaScriptSafeStrEncode(str: string): string
    {
        return btoa(Str.EncodeUrl(str));
    }

    // 任意の文字列を安全にデコード
    public static JavaScriptSafeStrDecode(str: string): string
    {
        return Str.DecodeUrl(atob(str));
    }
}

