import React from "react";

interface HighlightedOptionProps {
	text: string;
	highlight: string;
}

const HighlightedOption = ({text, highlight}: HighlightedOptionProps) => {
	const textPartials: string[] = text.split(new RegExp(`(${highlight})`, 'gi'));

	return (
		<div className='option-text'>
			{textPartials.map((partial: string, index: number) => {
				const isHighlighted: boolean = partial.toLowerCase() === highlight.toLowerCase();

				return (
					<span
						key={index}
						className={isHighlighted ? "highlight-text" : ""}
					>
            {partial}
          </span>
				)
			})}
		</div>
	);
}

export default HighlightedOption;
