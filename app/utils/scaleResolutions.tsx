import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Define resolution buckets and multipliers
const getMultiplier = () => {
    if (width >= 3840 || height >= 2160) return 3.0; // 4K UHD
    if (width >= 2560 || height >= 1440) return 2.0; // 3K QHD
    if (width >= 1920 || height >= 1080) return 1.5; // 2K FHD
    if (width >= 1280 || height >= 720) return 1.0;  // 1K HD
    return 1.0; // Default scaling for smaller resolutions
};

const scale = (size) => size * getMultiplier();

export default scale;
