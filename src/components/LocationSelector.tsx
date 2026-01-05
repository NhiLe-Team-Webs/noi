import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { getProvinces, getDistricts, getWards, Province, District, Ward } from '@/lib/location';

interface LocationSelectorProps {
    onLocationChange: (location: string) => void;
    defaultValue?: string;
}

const LocationSelector = ({ onLocationChange, defaultValue }: LocationSelectorProps) => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
    const [selectedWard, setSelectedWard] = useState<Ward | null>(null);

    const [openProvince, setOpenProvince] = useState(false);
    const [openDistrict, setOpenDistrict] = useState(false);
    const [openWard, setOpenWard] = useState(false);

    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingWards, setLoadingWards] = useState(false);

    useEffect(() => {
        const fetchProvinces = async () => {
            setLoadingProvinces(true);
            try {
                const data = await getProvinces();
                setProvinces(data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            } finally {
                setLoadingProvinces(false);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            const fetchDistricts = async () => {
                setLoadingDistricts(true);
                try {
                    const data = await getDistricts(selectedProvince.code);
                    setDistricts(data);
                    setWards([]);
                    setSelectedDistrict(null);
                    setSelectedWard(null);
                } catch (error) {
                    console.error('Error fetching districts:', error);
                } finally {
                    setLoadingDistricts(false);
                }
            };
            fetchDistricts();
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            const fetchWards = async () => {
                setLoadingWards(true);
                try {
                    const data = await getWards(selectedDistrict.code);
                    setWards(data);
                    setSelectedWard(null);
                } catch (error) {
                    console.error('Error fetching wards:', error);
                } finally {
                    setLoadingWards(false);
                }
            };
            fetchWards();
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);

    useEffect(() => {
        if (selectedProvince && selectedDistrict && selectedWard) {
            const locationString = `${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`;
            onLocationChange(locationString);
        }
    }, [selectedProvince, selectedDistrict, selectedWard, onLocationChange]);

    return (
        <div className="flex flex-col gap-4">
            {/* Province Selector */}
            <Popover open={openProvince} onOpenChange={setOpenProvince}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openProvince}
                        className="w-full justify-between"
                    >
                        {selectedProvince ? selectedProvince.name : "Chọn Tỉnh / Thành phố..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Tìm tỉnh thành..." />
                        <CommandEmpty>Không tìm thấy.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-y-auto">
                            {provinces.map((province) => (
                                <CommandItem
                                    key={province.code}
                                    value={province.name}
                                    onSelect={() => {
                                        setSelectedProvince(province);
                                        setOpenProvince(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedProvince?.code === province.code ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {province.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

            {/* District Selector */}
            <Popover open={openDistrict} onOpenChange={setOpenDistrict}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openDistrict}
                        className="w-full justify-between"
                        disabled={!selectedProvince}
                    >
                        {selectedDistrict ? selectedDistrict.name : "Chọn Quận / Huyện..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Tìm quận huyện..." />
                        <CommandEmpty>Không tìm thấy.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-y-auto">
                            {districts.map((district) => (
                                <CommandItem
                                    key={district.code}
                                    value={district.name}
                                    onSelect={() => {
                                        setSelectedDistrict(district);
                                        setOpenDistrict(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedDistrict?.code === district.code ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {district.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

            {/* Ward Selector */}
            <Popover open={openWard} onOpenChange={setOpenWard}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openWard}
                        className="w-full justify-between"
                        disabled={!selectedDistrict}
                    >
                        {selectedWard ? selectedWard.name : "Chọn Phường / Xã..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Tìm phường xã..." />
                        <CommandEmpty>Không tìm thấy.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-y-auto">
                            {wards.map((ward) => (
                                <CommandItem
                                    key={ward.code}
                                    value={ward.name}
                                    onSelect={() => {
                                        setSelectedWard(ward);
                                        setOpenWard(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedWard?.code === ward.code ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {ward.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default LocationSelector;
