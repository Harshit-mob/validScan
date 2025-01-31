// app/dashboard/index.tsx
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function DashboardHome() {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text variant="titleLarge">Welcome to Dashboard</Text>
        </View>
    );
}
