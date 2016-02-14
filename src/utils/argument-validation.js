export function validateRequiredArgument(args) {
	var keys = Object.keys(args)
	if (keys.length > 0) {
		keys.forEach((key) => {
			if (!args[key]) {
				throw Error(`${key} cannot be null`)
			}
		})
	}
}
