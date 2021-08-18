const { Country } = require('../db');

const paginate = async (pageSize, pageLimit) => {
    try{
        const limit = parseInt(pageLimit);
        const page = parseInt(pageSize);

        let { count, rows } = await Country.findAndCountAll({ offset: page, limit: limit });

        return {
            previousPage: getPreviousPage(page),
            currentPage: page,
            nextPage: getNextPage(page, limit, count),
            total: count,
            limit: limit,
            data: rows
        }
    } catch (error){
        console.log(error);
    }
}

const getNextPage = (page, limit, total) => {
    if((total/limit) > page) {
        return page + 1;
    }
    return null
}

const getPreviousPage = (page) => {
    if (page < 0){
        return null
    }
    return page-1;
}

module.exports = {
    paginate
}