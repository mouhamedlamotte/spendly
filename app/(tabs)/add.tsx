import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Définir le schéma Zod
const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  type: z.enum(["income", "expense"]),
});

// Typage automatique grâce à Zod
type ExpenseFormData = z.infer<typeof expenseSchema>;

const AddExpense = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: 0,
      type: "expense",
    },
  });

  const onSubmit = (data: ExpenseFormData) => {
    console.log("Transaction enregistrée :", data);
    // Ici tu pourrais enregistrer la transaction !
  };

  return (
    <SafeAreaView className="px-3 flex-1 pt-6 bg-background">
      <Text style={styles.title} className="text-red-700">Add Transaction</Text>

      <View style={styles.formGroup}>
        <Text>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Café"
          onChangeText={(text) => setValue("title", text)}
        />
        {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 5.99"
          keyboardType="numeric"
          onChangeText={(text) => setValue("amount", Number(text))}
        />
        {errors.amount && <Text style={styles.error}>{errors.amount.message}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text>Type</Text>
        <View style={styles.typeButtons}>
          <Button title="Expense" onPress={() => setValue("type", "expense")} />
          <Button title="Income" onPress={() => setValue("type", "income")} />
        </View>
        {errors.type && <Text style={styles.error}>{errors.type.message}</Text>}
      </View>

      <Button title="Save Transaction" onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  error: {
    color: "red",
    marginTop: 5,
  },
  typeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
