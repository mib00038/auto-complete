import React, {useRef, useState} from 'react';
import HighlightedOption from "./HighlightedOption";

interface AutoCompleteProps {
	options: string[];
}

// filtering is asynchronous as per test requirements (to mock asynchronous API REST call)
const fetchFilteredOptionsPromise = (searchSting: string, options: string[]): Promise<string[]> =>
	new Promise((resolve, _): void => {
		const filteredOptions: string[] = options.filter((optionName: string) =>
			optionName.toLowerCase().indexOf(searchSting.toLowerCase()) > -1
		)
		resolve(filteredOptions)
	});

const AutoComplete = ({options} : AutoCompleteProps) => {
	const [activeOption, setActiveOption] = useState<number>(0);
	const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const [userInput, setUserInput] = useState<string>('');
	const inputRef: React.Ref<HTMLInputElement> = useRef(null);

	const handleInputOnChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		const _userInput: string = event?.currentTarget?.value;

		// would require error handling in production
		const _filteredOptions: string[] = await fetchFilteredOptionsPromise(_userInput, options);

		setActiveOption(0);
		setFilteredOptions(_filteredOptions);
		setShowOptions(true);
		setUserInput(_userInput);
	};

	const handleOptionOnClick = (e: React.MouseEvent<HTMLLIElement>): void => {
		setShowOptions(false);
		setActiveOption(0);
		setFilteredOptions([]);
		setUserInput(e.currentTarget.innerText);
		inputRef.current?.focus();
	};

	const handleInputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		let optionIndex: number = 0;
		let el: HTMLElement | null = null;

		switch(e.key){
			case "Enter":
				setActiveOption(optionIndex);
				setShowOptions(false);
				setUserInput(filteredOptions[activeOption]);
				break;
			case "ArrowUp":
				optionIndex = activeOption === 0 ? filteredOptions.length - 1 : activeOption - 1;
				setActiveOption(activeOption === 0 ? filteredOptions.length - 1 : activeOption - 1);
				el = document.getElementById(`option-${optionIndex}`);
				el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
				break;
			case "ArrowDown":
				optionIndex = activeOption === filteredOptions.length - 1 ? 0 : activeOption + 1
				setActiveOption(optionIndex);
				el = document.getElementById(`option-${optionIndex}`);
				el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
				break;
			default:
				break;
		}
	};

	return (
		<div className="search-wrapper">
			<input
				ref={inputRef}
				autoFocus
				placeholder='search colors...'
				type="text"
				className="search-box"
				onChange={handleInputOnChange}
				onKeyDown={handleInputOnKeyDown}
				value={userInput}
			/>
			{!!(showOptions && userInput && filteredOptions.length) && (
				<ul className="options" >
					{filteredOptions.map((optionName: string, index: number) => {
						const className: string = index === activeOption ? 'option-active' : '';
						// <option> elements won't allow partial highlighting of text via <spam> children, so we use a <ul> and <li> elements
						// in production the 'react-select' library might offer a cleaner solution ?
						return (
							<li id={`option-${index}`} className={className} key={optionName} onClick={handleOptionOnClick}>
								<HighlightedOption text={optionName} highlight={userInput} />
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}

export default AutoComplete;
