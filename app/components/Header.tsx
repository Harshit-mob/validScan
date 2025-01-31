import {Appbar} from "react-native-paper";
import { DrawerToggleButton } from "@react-navigation/drawer";


const Header = ({ onToggleDrawer }) => {

    return (
        <Appbar.Header>
            <Appbar.Content title="Welcome to ValidScan" />
            <DrawerToggleButton />
            {/*<Appbar.Action icon="menu" size={scale(24)} onPress={() => <DrawerToggleButton />} />*/}
        </Appbar.Header>
    );
};

export default Header;
