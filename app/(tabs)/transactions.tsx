import { Text } from '@/components/ui/Text'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Transactions = () => {
  return (
    <SafeAreaView className="px-3 flex-1 pt-6 bg-background">
        <Text  size="2xl" weight="bold" >Transactions</Text>
    </SafeAreaView>
  )
}

export default Transactions