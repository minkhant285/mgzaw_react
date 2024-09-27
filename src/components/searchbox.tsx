import { OptionProps, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';
import { ImSearch } from "react-icons/im";
import React, { useContext } from 'react';
import { IMovie, IReturnPayload } from '../models';
import useApi from '../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../providers/app.provider';

const SearchBox: React.FC = () => {

    const searchMovie = useApi('searchArticles');
    const [selectedOption, setSelectedOption] = React.useState<IMovie | null>(null);
    const { searchModalControl } = useContext(AppContext);
    const navigate = useNavigate();

    const lSearchArticles = async (query: string): Promise<IMovie[]> => {

        if (!query && query.length < 3) {
            return [];
        }
        const res = await searchMovie.sendRequest({
            url: `movie/search/${query}`,
            method: 'GET',
        }) as IReturnPayload;
        console.log(query, res.result)
        if (res && res.result && res.result !== null) {
            const d = res.result as IMovie[];
            return d;
        }
        return [];
    }

    const handleChange = (option: any) => {

        setSelectedOption(option);
        searchModalControl(false);
        navigate(`/video/watch/${option.name}`);
    };


    const customStyles: StylesConfig<IMovie, false> = {
        control: (base) => ({
            ...base,
            minHeight: '34px',
            backgroundColor: 'black'
        }),
        dropdownIndicator: (base) => ({
            ...base,
            display: 'none'
        }),
        clearIndicator: (base) => ({
            ...base,
            padding: '10px',
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: 'rgba(255, 0, 30, 0.08)',
        }),
        valueContainer: (base) => ({
            ...base,
            padding: '0px 6px'
        }),
        input: (base) => ({
            ...base,
            margin: '0px',
            padding: '0px',
            color: '#fff'
        }),
        menu: (base) => ({
            ...base
        }),
    };

    const CustomOption: React.FC<OptionProps<IMovie, false>> = (props) => {

        return (
            <div
                {...props.innerProps}

                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    backgroundColor: props.isFocused ? '#0aafe7' : 'white',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    searchModalControl(false);
                    navigate(`/video/watch/${props.data.name}`);
                }}
            >
                {/* <img
                    src={props.data.thumbnail_url !== null ? props.data.coverphoto : Assets.article}
                    className='w-10 h-fit object-contain mr-2'
                    alt='cover photo'
                /> */}
                <a className="line-clamp-1" > {props.data.name}</a>
            </div>
        );
    };

    return <AsyncSelect
        cacheOptions
        autoFocus
        loadOptions={lSearchArticles}
        placeholder={<span className="flex items-center gap-1"><ImSearch size={15} /> Search......</span>}
        onChange={handleChange}
        styles={customStyles}
        value={selectedOption}
        noOptionsMessage={({ inputValue }) => inputValue.length < 4 ? null : "No Content Found!"}
        components={{ Option: CustomOption }}
    />
}

export default SearchBox;
