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

import { CryptoLib } from "../../Imports";
import { Str } from "./Str";

// Author: Daiyuu Nobori
// Description

export class Secure
{
    public static JavaScriptEasyStrDecrypt(srcString: string, password: string): string
    {
        srcString = Str.NonNull(srcString);
        password = Str.NonNull(password);

        if (Str.IsEmpty(srcString)) return "";

        const srcHex = Str.JavaScriptSafeStrDecode(srcString);

        const srcBytes = Secure.HexStringToWordArray(srcHex);

        const ivBytes = Secure.SliceWordArray(CryptoLib.SHA256("1" + password), 0, 128 / 8);
        const keyBytes = Secure.SliceWordArray(CryptoLib.SHA256("2" + password), 0, 256 / 8);

        const params = CryptoLib.lib.CipherParams.create(
            {
                ciphertext: srcBytes,
                padding: CryptoLib.pad.Pkcs7,
            });

        const destBytes = CryptoLib.AES.decrypt(params, keyBytes, { iv: ivBytes } );

        return Secure.WordArrayToUtf8String(destBytes);
    }

    public static HexStringToWordArray(src: string): CryptoLib.lib.WordArray
    {
        return CryptoLib.enc.Hex.parse(Str.NonNull(src));
    }

    public static WordArrayToHexString(src: CryptoLib.lib.WordArray): string
    {
        return Str.NonNull(src.toString());
    }

    public static WordArrayToUtf8String(src: CryptoLib.lib.WordArray): string
    {
        return CryptoLib.enc.Utf8.stringify(src);
    }

    public static SliceWordArray(src: CryptoLib.lib.WordArray, start: number, length: number): CryptoLib.lib.WordArray
    {
        const srcHex = src.toString();

        const tmp = srcHex.slice(start * 2, (start + length) * 2);

        return CryptoLib.enc.Hex.parse(tmp);
    }
}

