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
    // HTML タグ一覧
    public static readonly HtmlSpacing = "&nbsp;";
    public static readonly HtmlCrlf = "<BR>";
    public static readonly HtmlBr = Str.HtmlCrlf;
    public static readonly HtmlLt = "&lt;";
    public static readonly HtmlGt = "&gt;";
    public static readonly HtmlAmp = "&amp;";
    public static readonly HtmlTab = "&amp;&amp;&amp;&amp;&amp;&amp;&amp;&amp;";

    // 改行コード
    public static readonly NewLine_CrLf = "\r\n";
    public static readonly NewLine_Cr = "\r";
    public static readonly NewLine_Lf = "\n";

    // 文字列を大文字・小文字を区別して比較
    public static IsSame(s1?: string, s2?: string): boolean
    {
        return Str.StrCmp(s1, s2);
    }
    public static StrCmp(s1?: string, s2?: string): boolean
    {
        s1 = Str.NonNull(s1);
        s2 = Str.NonNull(s2);

        return s1 === s2;
    }
    public static Cmp(s1?: string, s2?: string): number
    {
        return Str.StrCmpRetInt(s1, s2);
    }
    public static StrCmpRetInt(s1?: string, s2?: string): number
    {
        s1 = Str.NonNull(s1);
        s2 = Str.NonNull(s2);

        return s1.localeCompare(s2);
    }

    // 文字列を大文字・小文字を区別せずに比較
    public static IsSamei(s1?: string, s2?: string): boolean
    {
        return Str.StrCmpi(s1, s2);
    }
    public static StrCmpi(s1?: string, s2?: string): boolean
    {
        s1 = Str.NonNull(s1);
        s2 = Str.NonNull(s2);

        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        return s1 === s2;
    }
    public static Cmpi(s1?: string, s2?: string): number
    {
        return Str.StrCmpRetInti(s1, s2);
    }
    public static StrCmpRetInti(s1?: string, s2?: string): number
    {
        s1 = Str.NonNull(s1);
        s2 = Str.NonNull(s2);

        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        return s1.localeCompare(s2);
    }

    // 文字列を置換する
    public static ReplaceStr(str?: string, oldKeyword?: string, newKeyword?: string, caseSensitive = false): string
    {
        str = Str.NonNull(str);
        if (Str.IsNullOrZeroLen(str)) return "";
        oldKeyword = Str.NonNull(oldKeyword);
        newKeyword = Str.NonNull(newKeyword);
        if (Str.IsNullOrZeroLen(oldKeyword)) return str;

        let i = 0;
        let j = 0;
        let num = 0;

        let sb = "";

        const len_string = str.length;
        const len_old = oldKeyword.length;
        const len_new = newKeyword.length;

        while (true)
        {
            i = Str.SearchStr(str, oldKeyword, i, caseSensitive);
            if (i === -1)
            {
                sb += str.slice(j);
                break;
            }

            num++;

            sb += str.slice(j, i);
            sb += newKeyword;

            i += len_old;
            j = i;
        }

        return sb;
    }

    // 文字列を検索する
    public static SearchStr(str?: string, keyword?: string, start = 0, caseSensitive = false): number
    {
        if (Str.IsNullOrZeroLen(str) || Str.IsNullOrZeroLen(keyword)) return -1;

        if (caseSensitive)
        {
            return str!.indexOf(keyword!, start);
        }
        else
        {
            str = str!.toLowerCase();
            keyword = keyword!.toLowerCase();

            return str.indexOf(keyword, start);
        }
    }

    // HTML デコード
    public static DecodeHtml(str?: string): string
    {
        str = Str.NonNull(str);

        str = Str.ReplaceStr(str, Str.HtmlCrlf, Str.NewLine_CrLf, false);

        str = Str.ReplaceStr(str, Str.HtmlSpacing, " ", true);

        str = Str.ReplaceStr(str, Str.HtmlLt, "<", true);
        str = Str.ReplaceStr(str, Str.HtmlGt, ">", true);
        str = Str.ReplaceStr(str, Str.HtmlAmp, "&", true);

        str = Str.NormalizeCrlf(str);

        return str;
    }

    // HTML エンコード
    public static EncodeHtml(str?: string, forceAllSpaceToTag = false, spaceIfEmpty = false): string
    {
        str = Str.NonNull(str);

        // 改行を正規化
        str = Str.NormalizeCrlf(str);

        // & を変換
        str = Str.ReplaceStr(str, "&", Str.HtmlAmp, true);

        // タグを変換
        str = Str.ReplaceStr(str, "<", Str.HtmlLt, true);
        str = Str.ReplaceStr(str, ">", Str.HtmlGt, true);

        // スペースを変換
        if (str.indexOf(" ") !== -1)
        {
            if (forceAllSpaceToTag)
            {
                str = Str.ReplaceStr(str, " ", Str.HtmlSpacing, true);
            }
            else
            {
                // 連続するスペースのみ変換
                let sb = "";
                let flag = false;

                for (let i = 0; i < str.length; i++)
                {
                    const c = str[i];

                    if (c === " ")
                    {
                        if (flag === false)
                        {
                            flag = true;
                            sb += " ";
                        }
                        else
                        {
                            sb += Str.HtmlSpacing;
                        }
                    }
                    else
                    {
                        flag = false;
                        sb += c;
                    }
                }

                str = sb;
            }
        }

        // tab を変換
        str = Str.ReplaceStr(str, "\t", Str.HtmlTab, true);

        // 改行コード
        str = Str.ReplaceStr(str, Str.NewLine_CrLf, Str.HtmlCrlf, true);

        if (spaceIfEmpty)
        {
            if (Str.IsEmpty(str))
            {
                str = Str.HtmlSpacing;
            }
        }

        return str;
    }

    // 文字列の改行を正規化する
    public static NormalizeCrlf(src?: string, crlfData = Str.NewLine_CrLf, ensureLastLineCrlf = false): string
    {
        let ret = "";
        let tmp = "";

        src = Str.NonNull(src);

        for (let i = 0; i < src.length; i++)
        {
            let isNewLine = false;
            const code = Str.CharToAscii(src[i]);
            if (code === 13)
            {
                if (i < (src.length - 1) && Str.CharToAscii(src[i + 1]) === 10)
                {
                    i++;
                }
                isNewLine = true;
            }
            else if (code === 10)
            {
                isNewLine = true;
            }

            if (isNewLine)
            {
                ret += tmp;
                ret += crlfData;

                tmp = "";
            }
            else
            {
                tmp += src[i];
            }
        }

        if (tmp.length >= 1)
        {
            ret += tmp;

            if (ensureLastLineCrlf)
            {
                ret += crlfData;
            }
        }

        return ret;
    }

    // 文字列を整数にパース
    public static StrToInt(str?: string): number
    {
        try
        {
            if (Str.IsNull(str))
            {
                return 0;
            }

            const int = parseInt(str!.trim());
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
    public static ToBool(str?: string): boolean
    {
        const int = Str.StrToInt(str);
        if (int !== 0) return true;
        const tmp = Str.Trim(str).toLowerCase();
        if (tmp.length >= 1)
        {
            if (tmp[0] === 'y' || tmp[0] === 't')
            {
                return true;
            }
            if (tmp.startsWith("ok") || tmp.startsWith("on") || tmp.startsWith("enable"))
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
    public static IsNullOrZeroLen(str?: string): boolean
    {
        if (Util.IsNullOrUndefined(str)) return true;
        if (str!.length === 0) return true;

        return false;
    }
    public static IsNull(str?: string): boolean
    {
        if (Util.IsNullOrUndefined(str)) return true;
        return false;
    }
    public static IsNonNull(str?: string): boolean
    {
        return !Str.IsNull(str);
    }

    // 文字列が空かどうか
    public static IsEmpty(str?: string): boolean
    {
        if (Util.IsNullOrUndefined(str)) return true;
        if (str!.trim().length === 0) return true;

        return false;
    }
    public static IsFilled(str?: string): boolean
    {
        return !Str.IsEmpty(str);
    }

    // Null または Undefined でない文字を返す
    public static NonNull(str?: string): string
    {
        if (Str.IsNullOrZeroLen(str)) return "";
        return str!;
    }

    // Null または Undefined でない trim() 済み文字を返す
    public static NonNullTrim(str?: string): string
    {
        if (Str.IsNullOrZeroLen(str)) return "";
        return str!.trim();
    }

    // 文字列か Undefined を返す
    public static FilledOrUndefined(str?: string): string | undefined
    {
        if (Str.IsFilled(str))
        {
            return str;
        }
        else
        {
            return undefined;
        }
    }

    // URL エンコード (Cores の UrlEncode に対応。A-Z a-z 0-9 - _ . ! ~ * ' ( ) 以外をすべてエスケープ)
    public static EncodeUrl(str?: string): string
    {
        if (Str.IsNullOrZeroLen(str)) return "";
        return encodeURIComponent(str!);
    }

    // URL デコード (Cores の UrlEncode に対応。A-Z a-z 0-9 - _ . ! ~ * ' ( ) 以外をすべてエスケープ)
    public static DecodeUrl(str?: string): string
    {
        if (Str.IsNullOrZeroLen(str)) return "";
        return decodeURIComponent(str!);
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

    // FontAwsome のアイコン名の class の中の文字列を入れると分解する便利関数
    public static ParseFontAwsomeIconClassStr(classStr?: string): FontAwsomeIcon | null
    {
        const icon = new FontAwsomeIcon(classStr);

        if (!icon.IsOK)
        {
            return null;
        }

        return icon;
    }
}


// FontAwsome のアイコン名の class の中の文字列を入れると分解する便利クラス
export class FontAwsomeIcon
{
    public readonly IsOK: boolean = false;
    public readonly ClassStr: string = "";
    public readonly PackName: string = "";
    public readonly IconName: string = "";

    constructor(classStr?: string)
    {
        classStr = Str.NonNullTrim(classStr);

        const tokens = classStr.split(" ");
        if (tokens.length === 2)
        {
            const packName = tokens[0].trim();
            const tmp = tokens[1].trim();

            const i = tmp.indexOf("-");
            if (i !== -1)
            {
                const iconName = tmp.slice(i + 1);

                this.PackName = packName;
                this.IconName = iconName;
                this.ClassStr = tokens[0].trim() + " " + tokens[1].trim();
                this.IsOK = true;
            }
        }
    }
}

