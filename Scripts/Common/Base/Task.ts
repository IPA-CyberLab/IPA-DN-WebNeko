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

import { Util } from "./Util";
import { default as _AsyncLock } from "async-lock";

// Author: Daiyuu Nobori
// Async Utils

export class AsyncLock
{
    readonly LockObj = new _AsyncLock();

    public async LockAsync<T>(fn: (() => T | PromiseLike<T>)): Promise<T>
    {
        return await this.LockObj.acquire("lock", fn);
    }
}

export class Task
{
    public static async Delay(msec: number): Promise<void>
    {
        msec = Util.ToInt(msec);

        return new Promise(
            function (resolve)
            {
                setTimeout(function ()
                {
                    resolve();
                }, msec);
            }
        );
    }

    public static async StartAsyncTaskAsync(taskOrAsyncFunction: (() => PromiseLike<void>) | Promise<void>, showErrorAlert = false): Promise<void>
    {
        try
        {
            if (Util.IsFunction(taskOrAsyncFunction))
            {
                const func = taskOrAsyncFunction as (() => PromiseLike<void>);
                await func();
            }
            else
            {
                const task = taskOrAsyncFunction as Promise<void>;
                await task;
            }
        }
        catch (ex)
        {
            Util.Debug(ex);

            if (showErrorAlert)
            {
                alert(ex);
            }

            throw ex;
        }
    }
}

