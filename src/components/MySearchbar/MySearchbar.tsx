import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import style from './MySearchbar.module.scss';
const MySearchBar = () => {
	const [isFocus, setIsFocus] = useState(false);

	const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		e.target.placeholder = '';
		setIsFocus(true);
	};

	const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		e.target.placeholder = 'Search';
		setIsFocus(false);
	};

	return (
		<div className={isFocus ? style['search__container--focus'] : style['search__container']}>
			{isFocus ? null : <SearchIcon className={style['search__icon']} />}
			<input
				className={style['search__bar']}
				type="text"
				placeholder="Search"
				onFocus={focusHandler}
				onBlur={blurHandler}
			/>
			{isFocus ? <div className={style['search__content']}>something</div> : null}
		</div>
	);
};

export default MySearchBar;
