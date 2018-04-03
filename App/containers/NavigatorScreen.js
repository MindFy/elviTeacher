export default function NavigatorScreen(screen, navigationOptions = {
  title: '',
  headerStyle: {
    backgroundColor: '#171B29',
  },
  headerTintColor: '#ffffff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}) {
  return {
    screen,
    navigationOptions,
  }
}
