import { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Paragraph, Text } from 'react-native-paper';

import { MainTabScreenProps } from '@/types/navigation';

type Props = {
  navigation: MainTabScreenProps<'Somministration'>['navigation'];
};

const Somministration: FC<Props> = ({ navigation }) => {
  return (
    <FlatList
      style={styles.container}
      data={[{}]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => (
        <>
          <View style={styles.content}>
            <Text style={styles.title}>Somministrazioni</Text>
            <Card style={styles.card}>
              <Card.Content>
                <Paragraph style={styles.text}>CBA-VE</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained" onPress={() => navigation.navigate('Cba')}>
                  Vai alla compilazione
                </Button>
              </Card.Actions>
            </Card>
          </View>
          <View style={styles.content}>
            <Card style={styles.card}>
              <Card.Content>
                <Paragraph style={styles.text}>ERIraos-CL</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained">Vai alla compilazione</Button>
              </Card.Actions>
            </Card>
          </View>
          <View style={styles.content}>
            <Card style={styles.card}>
              <Card.Content>
                <Paragraph style={styles.text}>PID-5</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained">Vai alla compilazione</Button>
              </Card.Actions>
            </Card>
          </View>
          <View style={styles.content}>
            <Card style={styles.card}>
              <Card.Content>
                <Paragraph style={styles.text}>SAT-P</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained">Vai alla compilazione</Button>
              </Card.Actions>
            </Card>
          </View>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
    textAlign: 'center',
  },
  card: {
    marginVertical: 4,
    alignItems: 'center',
    paddingBottom: 8,
    marginHorizontal: 10,
  },
  title: {
    marginHorizontal: 10,
  },
  text: {
    textAlign: 'center',
  },
  viewLabels: {
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollViewDiariesList: {
    margin: 4,
    flexDirection: 'row',
  },
  surface: {
    borderRadius: 8,
    marginRight: 8,
    height: 160,
    width: 160,
    elevation: 2,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  /* text: {
    padding: 8,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  }, */
});

export default Somministration;
