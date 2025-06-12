import { StyleSheet } from 'react-native';
import Colors from './Colors';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f0e9',
    gap: 4,
    height: 50,
    borderRadius: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    fontSize: 16,
  },
  btn: {
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'inter-b',
    color: Colors.dark,
  },
  btnIcon: {
    position: 'absolute',
    left: 16,
  },
  footer: {
    position: 'absolute',
    height: 60,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },

    gap: 14,
    marginBottom: 24,
  },
  ordersCard: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    gap: 2,
  },
  cardGrow: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  roundCircle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 15,
  },
  isActive: {
    borderBottomColor: Colors.blue,
    borderBottomWidth: 2,
    backgroundColor: 'rgba(66, 135, 245, 0.2)',
  },
});

export const typeColorsArray = [Colors.blue, Colors.green];
