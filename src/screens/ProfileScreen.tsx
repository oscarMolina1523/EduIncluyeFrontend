import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import UserService from '../services/UserService';
import UserModel from '../models/UserModel';

const ProfileScreen = ({ navigation }: any) => {
  const userService = useMemo(() => new UserService(), []);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [image, setImage] = useState('');
  const {user, logout}= useAuth();

  const handleEditProfile = async () => {
    if (!user) return;

    const updatedUser = UserModel.fromJsonModel ({
      ...user,
      name: name,
      email: email,
      isActive:true,
    });

    const result = await userService.updateUser(user.id, updatedUser);
    if (result) {
      setModalVisible(false);
      Alert.alert("Éxito", "Perfil actualizado correctamente");
      logout();
    } else {
      Alert.alert("Error", "No se pudo actualizar el perfil");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri:'https://img.freepik.com/free-photo/girl-with-long-hair-being-happy_23-2148244714.jpg?semt=ais_hybrid&w=740' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      {/* ✅ Mostrar solo si es admin
      {role === 'admin' && (
        <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]}>
          <Text style={styles.buttonText}>Administrar</Text>
        </TouchableOpacity>
      )} */}

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={logout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo"
              value={email}
              onChangeText={setEmail}
            />
            {/* <TextInput
              style={styles.input}
              placeholder="Imagen"
              value={image}
              onChangeText={setImage}
            /> */}
            <TouchableOpacity onPress={handleEditProfile} style={[styles.button, { width: '100%' }]} >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.logoutButton, { width: '100%' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 120, height: 120, borderRadius: 60, marginBottom: 20,
  },
  name: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 10,
  },
  email: {
    fontSize: 18, color: '#666', marginBottom: 20,
  },
  button: {
    backgroundColor: '#339999', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20,
    marginBottom: 10, width: '80%', alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#CF1020',
  },
  buttonText: {
    color: '#FFFFFF', fontSize: 18, fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%',
  },
  modalTitle: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 10,
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15, width: '100%',
  },
});

export default ProfileScreen;