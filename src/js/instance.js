function instanceof2(left, right) {
    const rightPrototype = right.prototype;
    let leftProto = left.__proto__;
    while (leftProto) {
        if (leftProto === rightPrototype) return true;
        leftProto = leftProto.__proto__;
    }
    return false;
}

console.log([] instanceof Array);
console.log(instanceof2([], Array));
