import {useEffect, useState} from "react";

interface Color {
	name: string;
	hex: string;
}

export interface UseColorsType {
	colors: string[];
}

const useColors = (): UseColorsType => {
	const [colors, setColors] = useState<string[]>([]);

	useEffect(() => {
		fetch('https://raw.githubusercontent.com/mib00038/json-colors/main/db.json')
			.then((resp: Response) => resp.json())
			.then((colors:  Color[]) => {
				const colorNames: string[] = colors.map((color: Color) => color.name)
				const colorSet: Set<string> = new Set(colorNames); // remove duplicates
				setColors(Array.from(colorSet));
			});
	}, []);


	return {colors}
}

export default useColors;