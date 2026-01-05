
const BASE_URL = 'https://provinces.open-api.vn/api';

export interface Province {
    code: number;
    name: string;
    division_type: string;
    codename: string;
    phone_code: number;
    districts: District[];
}

export interface District {
    code: number;
    name: string;
    division_type: string;
    codename: string;
    province_code: number;
    wards: Ward[];
}

export interface Ward {
    code: number;
    name: string;
    division_type: string;
    codename: string;
    district_code: number;
}

export const getProvinces = async (): Promise<Province[]> => {
    const response = await fetch(`${BASE_URL}/p/`);
    return response.json();
};

export const getDistricts = async (provinceCode: number): Promise<District[]> => {
    const response = await fetch(`${BASE_URL}/p/${provinceCode}?depth=2`);
    const data = await response.json();
    return data.districts;
};

export const getWards = async (districtCode: number): Promise<Ward[]> => {
    const response = await fetch(`${BASE_URL}/d/${districtCode}?depth=2`);
    const data = await response.json();
    return data.wards;
};
