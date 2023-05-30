function RandomSpawnInbounds(minimum, maximum) {
	const min = Math.ceil(minimum);
	const max = Math.floor(maximum);
	const randomSeed = Math.floor(Math.random() * (max - min) + min)
	return randomSeed;
}

function isIterable(parameter) {
	return (typeof param === "object") && param !== null && !Array.isArray(parameter);
}

function distance(point, other) {
	return Math.sqrt(Math.pow(other.x - point.x, 2) + Math.pow(other.y - point.y, 2));
}

function isCursorInsideCircle(cursor, entity) {
	return distance(cursor, entity) <= entity.radian
}





export {
	RandomSpawnInbounds,
	isCursorInsideCircle,
	isIterable
}
