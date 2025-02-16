import React, { useState } from 'react';
import { Menu, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import theme from '../app/theme';

const styles = StyleSheet.create({
  container: {
  
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  tab: {
    color: theme.colors.textLight, 
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
    alignItems: 'center',
    
  },
 
});


const OrderPicker = ({ selectedOrder, onSelectOrder }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const orders = [
    { label: 'Latest Repositories', value: 'latest' },
    { label: 'Best Rated Repositories', value: 'bestRated' },
    { label: 'Lowest Rated Repositories', value: 'lowestRated' },
  ];

  return (
    <View style={styles.container}>
    <Menu 
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Text onPress={openMenu}>Order by: {selectedOrder.label}</Text>}
    >
      {orders.map((order) => (
        <Menu.Item
          key={order.value}
          onPress={() => {
            onSelectOrder(order);
            closeMenu();
          }}
          title={order.label}
        />
      ))}
    </Menu>
    </View>
  );
};

export default OrderPicker;