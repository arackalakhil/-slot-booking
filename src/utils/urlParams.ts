export function getLocationParams(location: any) {
	return {
		view: location.hash.substring(1),
	};
}
