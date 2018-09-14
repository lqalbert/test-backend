import {findOne} from '@/api/findone'

export function formateEnum(data, fields, table) {
    let enums = []
    let enumsMap = {}
    for (let field in fields) {
        let perfield = fields[field]
        if (perfield.Type.substr(0, 4) === 'enum') {
            let fieldName = perfield.Field
            enums.push(fieldName)
            let percomment = (perfield.Comment.split(':'))[1]
            let newobj = {}
            percomment = percomment.split(',')
            for (let i = 0; i < percomment.length; i++) {
                let perobj = percomment[i].split('=')
                newobj[perobj[0]] = perobj[1]
                enumsMap[fieldName] = newobj
            }

        }
    }
    for (let key in data) {
        for (let k in data[key]) {
            // console.log(k)
            if (k === 'parent_id') {
                if ((data[key][k]) == 0) {
                    data[key][k] = '顶级'
                } else {
                    findOne(table, data[key][k]).then(response => {
                        data[key][k] = response.data.role_comment
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
            if (inArray(k, enums)) {
                data[key][k] = enumsMap[k][data[key][k]]
            }
        }
    }
    return data;
}

/**
 * 根据表明和id获取一行数据
 */
function findParent(tabel, parent_id) {


}

/**
 * 相当于php in_array
 */
function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] == needle) return true;
    }
    return false;
}