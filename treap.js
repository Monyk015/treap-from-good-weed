function Treap(x, y, left = null, right = null){
    this.x = x
    this.y = y
    this.left = left
    this.right = right
}

Treap.prototype.split = function (x) {
    let newTree = null
    let left = this.left
    let right = this.right
    if(this.x <= x)
    {
        if(this.right == null)
            right = null
        else
        {
            ;[newTree, right] = this.right.split(x)
        }
        left = new Treap(this.x, this.y, left, newTree)
    }
    else
    {
        if(this.left == null)
            left = null
        else
        {
            ;[left, newTree] = this.left.split(x)
        }
        right = new Treap(this.x, this.y, newTree, right)
    }
    return [left, right]
}

Treap.merge = function (left, right) {
    if(left == null)
        return right
    if(right == null)
        return left
    if(left.y > right.y)
    {
        let newRight = Treap.merge(left.right, right)
        return new Treap(left.x, left.y, left.left, newRight)
    }
    else
    {
        let newLeft = Treap.merge(right.left, left)
        return new Treap(right.x, right.y, newLeft, right.right)
    }
}

Treap.prototype.insert = function (x) {
    let right = null
    let left = null
    ;[left, right] = this.split(x, left, right)
    let middle = new Treap(x, Math.random())
    return Treap.merge(Treap.merge(left, middle), right)
}

Treap.prototype.remove = function (x) {
    let left = null,
        middle = null,
        right = null
    [left, right] = this.split(x - 1)
    [middle, right] = right.split(x)
    return Treap.merge(left, right)

}



function* treapFactory(keys)
{
    let treap = new Treap(keys[0],Math.random())
    render(treap)
    for(let i = 1; i < keys.length; ++i)
    {
        render(treap)
        yield
        treap = treap.insert(keys[i])
    }
}

let generator = treapFactory([5,6,1,3,4,8,9,10,12,13,18,21,17])

window.onkeyup = function () {
    generator.next()
}

function render(treap) {
    document.body.innerHTML = "<pre>" + JSON.stringify(treap, null, "\t").replace(/"/g,'') + "</pre>"
}