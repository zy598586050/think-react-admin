// 菜单变树结构
export const arrayToTree = (array: any,id = 'id',pid = 'pid') => {
    return array.filter((father: any) => {
        // 返回每一项的子项
        const children = array.filter((child: any) => father[id] == child[pid])
        children.length > 0 ? father['children'] = children : null
        return father[pid] == 0 // 返回第一层
    })
}