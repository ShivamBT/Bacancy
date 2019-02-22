import AsyncSelect from 'react-select/lib/Async';
import { loadAsyncValues} from '.././ApiCall/apiCall';
import makeAnimated from 'react-select/lib/animated';
import React from 'react';
import { Badge } from 'reactstrap';
import debounce from 'debounce-promise';

export const AsyncSelectComponent = (props) => {

    const loadOptions = debounce(loadAsyncValues, 1000);
    
    return (
        <div>
            <br />
            <h4>
                <Badge color="secondary">
                    Overseas City
                </Badge>
            </h4>

            <h6>
                <AsyncSelect
                    id="asyncSelect"
                    components={makeAnimated()}
                    isMulti={props.isMulti}
                    cacheOptions
                    defaultOptions={false}
                    loadOptions={loadOptions}
                    onChange={props.onChange}
                />
            </h6>


        </div>

    );
}
