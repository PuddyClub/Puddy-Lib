// Get JSON From URL
const getJsonFromUrl = function (url) {
    if (!url) url = location.href;
    var question = url.indexOf("?");
    var hash = url.indexOf("#");
    if (hash === -1 && question === -1) return {};
    if (hash === -1) hash = url.length;
    var query = question === -1 || hash === question + 1 ? url.substring(hash) :
        url.substring(question + 1, hash);
    var result = {};
    query.split("&").forEach((part) => {
        if (!part) return;
        part = part.split("+").join(" "); // replace every + with space, regexp-free version
        var eq = part.indexOf("=");
        var key = eq > -1 ? part.substr(0, eq) : part;
        var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
        var from = key.indexOf("[");
        if (from === -1) result[decodeURIComponent(key)] = val;
        else {
            var to = key.indexOf("]", from);
            var index = decodeURIComponent(key.substring(from + 1, to));
            key = decodeURIComponent(key.substring(0, from));
            if (!result[key]) result[key] = [];
            if (!index) result[key].push(val);
            else result[key][index] = val;
        }
    });
    return result;
};

module.exports = function (query, page, total, url = '', extraClass = '', extraClass2 = '') {

    if (url) {
        const params = getJsonFromUrl(url);
        if (Object.keys(params).length > 0) {
            if (params.page) {
                url = url.replace('&' + query + '=' + params.page, '').replace('?' + query + '=' + params.page, '?').replace('?&', '?');

                if (Object.keys(params).length === 1) {
                    url += query + '=';
                } else {
                    url += '&' + query + '=';
                }
            } else {
                url += '&' + query + '=';
            }
        } else {
            url += '?' + query + '=';
        }
    }

    // Pagination

    const pagination = [];
    const data = {
        url: url,
        extraClass: extraClass,
        extraClass2: extraClass2
    };

    data.next = false;
    data.previous = false;
    for (let i = page - 1; i > page - 5; i--) {
        if (i > 0) {
            pagination.push(i);
            data.previous = true;
        }
    }
    pagination.reverse();
    pagination.push(page);
    for (let i = page + 1; i < page + 5; i++) {
        if (i <= total) {
            pagination.push(i);
            data.next = true;
        }
    }

    // Build Data and send it
    data.page = page;
    data.pagination = pagination;

    if (pagination.indexOf(1) < 0) {
        data.firstPagination = true;
    } else {
        data.firstPagination = false;
    }
    if (pagination.indexOf(total) < 0) {
        data.lastPagination = true;
    } else {
        data.lastPagination = false;
    }

    data.pages = total;

    return data;

};