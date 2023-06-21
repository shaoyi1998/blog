function convertToChildrenFormat(categories) {
    const result = [];
    const categoryMap = {};

    // 创建分类映射表
    categories.forEach(category => {
        const { id, name, parent } = category;
        categoryMap[id] = { value: id.toString(), label: name, children: [] };
    });

    // 构建分类层级结构
    categories.forEach(category => {
        const { id, parent } = category;
        const currentCategory = categoryMap[id];
        if (parent !== null) {
            const parentCategory = categoryMap[parent];
            parentCategory.children.push(currentCategory);
        } else {
            result.push(currentCategory);
        }
    });

    return result;
}

function getParents(data, name) {
    const parents = [];
    let parent_id = null;

    // 找到指定名称的数据项
    for (const item of data) {
        if (item.name === name) {
            parent_id = item.parent;
            parents.push(String(item.id))
            break;
        }
    }
    // 逐级向上查找父级
    while (parent_id) {
        // parents.push(parent_id);
        for (const item of data) {
            if (item.id === parent_id) {
                parent_id = item.parent;
                parents.push(String(item.id));
                break;
            }
        }
    }

    return parents.reverse();
}

export {
    convertToChildrenFormat,
    getParents
}


//original_categories = [
//     {
//         "id": 1,
//         "name": "24",
//         "parent": None
//     },
//     {
//         "id": 3,
//         "name": "36",
//         "parent": 1
//     },
//     {
//         "id": 4,
//         "name": "36",
//         "parent": 3
//     }
// ]
//转变为element的级联选择器
// [
//     {
//         "value": "1",
//         "label": "24",
//         "children": [
//             {
//                 "value": "3",
//                 "label": "36",
//                 "children": [
//                     {
//                         "value": "4",
//                         "label": "36"
//                     }
//                 ]
//             }
//         ]
//     }
// ]