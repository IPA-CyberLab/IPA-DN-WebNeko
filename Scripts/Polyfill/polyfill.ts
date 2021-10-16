// isInteger polyfill for Internet Explorer
if (!Object.entries)
{
    Object.entries = function (obj: any): any
    {
        const ownProps = Object.keys(obj);
        let i = ownProps.length;
        const resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };
}
Number.isInteger = Number.isInteger || function (value: any): boolean
{
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};
if (!Array.prototype.fill)
{
    Object.defineProperty(Array.prototype, 'fill', {
        value: function (value: any)
        {
            // Steps 1-2.
            if (this === null)
            {
                throw new TypeError('this is null or not defined');
            }

            const O = Object(this);

            // Steps 3-5.
            const len = O.length >>> 0;

            // Steps 6-7.
            const start = arguments[1];
            const relativeStart = start >> 0;

            // Step 8.
            let k = relativeStart < 0 ?
                Math.max(len + relativeStart, 0) :
                Math.min(relativeStart, len);

            // Steps 9-10.
            const end = arguments[2];
            const relativeEnd = end === undefined ?
                len : end >> 0;

            // Step 11.
            const finalValue = relativeEnd < 0 ?
                Math.max(len + relativeEnd, 0) :
                Math.min(relativeEnd, len);

            // Step 12.
            while (k < finalValue)
            {
                O[k] = value;
                k++;
            }

            // Step 13.
            return O;
        }
    });
}


if (!String.prototype.startsWith)
{
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function (search: any, rawPos: any)
        {
            const pos = rawPos > 0 ? rawPos | 0 : 0;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}

