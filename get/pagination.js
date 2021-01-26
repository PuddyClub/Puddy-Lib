module.exports = function (query, page, total, url = '', extraClass = '', extraClass2 = '') {

    if (url) {
        const params = this.getJsonFromUrl(url);
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