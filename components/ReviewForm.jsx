import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CREATE_REVIEW } from '../graphql/createReview';
import theme from '../app/theme';

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  label: {
    fontSize: theme.fontSizes.large,
    marginBottom: 8,
    fontWeight: 'bold',
    color: theme.colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: theme.borderRadius,
    padding: 8,
    marginBottom: 16,
    fontSize: theme.fontSizes.large,
    color: theme.colors.primary,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 8,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.textLight,
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
  },
});

const ReviewForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { repositoryId, ownerName, repositoryName } = route.params;

  // Apollo Client mutation hook to create a review
  const [createReview, { loading: mutationLoading }] = useMutation(CREATE_REVIEW);

  const initialValues = {
    ownerName: ownerName || '', 
    repositoryName: repositoryName || '', 
    rating: '',
    text: '',
  };

  const validationSchema = Yup.object({
    ownerName: Yup.string().required('Owner name is required'),
    repositoryName: Yup.string().required('Repository name is required'),
    rating: Yup.number()
      .required('Rating is required')
      .min(0, 'Rating must be at least 0')
      .max(100, 'Rating must be at most 100'),
    text: Yup.string(),
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: parseInt(values.rating, 10),
            text: values.text,
          },
        },
      });

      // Redirect to the repository page
      navigation.navigate('Repository', { id: repositoryId });
    } catch (error) {
      console.error('Error details:', error.message, error.networkError, error.graphQLErrors);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Repository Owner</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
            value={values.ownerName}
            placeholder="Owner name"
            editable={false} 
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.errorText}>{errors.ownerName}</Text>
          )}

          <Text style={styles.label}>Repository Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
            placeholder="Repository name"
            editable={false} 
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.errorText}>{errors.repositoryName}</Text>
          )}

          <Text style={styles.label}>Rating (0-100)</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
            placeholder="Rating"
            keyboardType="numeric"
          />
          {touched.rating && errors.rating && (
            <Text style={styles.errorText}>{errors.rating}</Text>
          )}

          <Text style={styles.label}>Review</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            value={values.text}
            placeholder="Write your review"
            multiline
          />
          {touched.text && errors.text && (
            <Text style={styles.errorText}>{errors.text}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={mutationLoading}>
            <Text style={styles.buttonText}>
              {mutationLoading ? 'Sending...' : 'Create Review'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;