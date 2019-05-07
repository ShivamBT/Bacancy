export const onMaleAgeUp = (val) =>
{
    return {
        type: "MALE_AGE_UP",
        payload:val
    }
}

export const onMaleAgeDown = () =>
{
    return {
        type:"MALE_AGE_DOWN"
    }
}

export const onFemaleAgeUp = (val) =>
{
    return {
        type: "FEMALE_AGE_UP",
        payload:val
    }
}

export const onFemaleAgeDown = () =>
{
    return {
        type: "FEMALE_AGE_DOWN"
    }
}

export const increaseNumber = () =>
{
    return {
        type: "INCREASE_NUMBER"
    }
}