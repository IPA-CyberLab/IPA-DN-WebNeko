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
// ユーティリティ ライブラリ

import { toInteger } from "lodash";
import { Str } from "./Str";

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

    // 何でも boolean にする
    public static ToBool(object: any): boolean
    {
        if (Str.IsString(object))
        {
            return Str.ToBool(object as string);
        }

        if (!object) return false;
        return true;
    }

    // Null または Undefined かどうか
    public static IsNullOrUndefined(object: any): boolean
    {
        if (object === null || object === undefined)
        {
            return true;
        }

        return false;
    }

    // オブジェクトの型名を取得
    public static GetTypeName(object: any): string
    {
        if (object === null) return "null";
        if (object === undefined) return "undefined";
        return (typeof object);
    }

    // オブジェクトが関数かどうか確認する
    public static IsFunction(object: any): boolean
    {
        return Util.IsObjectType(object, "function");
    }

    // オブジェクトが指定された型かどうか確認する
    public static IsObjectType(object: any, type: string): boolean
    {
        return Str.IsSamei(Util.GetTypeName(object), type);
    }

    // オブジェクトを JSON に変換
    public static ObjectToJson(object?: any): string
    {
        return JSON.stringify(object);
    }

    // JSON をオブジェクトに変換
    public static JsonToObject(json?: string): any
    {
        json = Str.NonNull(json);

        return JSON.parse(json);
    }
}

