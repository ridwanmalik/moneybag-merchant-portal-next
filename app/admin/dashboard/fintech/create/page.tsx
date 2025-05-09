"use client"
import { TabItem, Tabs } from "@/components/ui"
import { useState } from "react"
import { BasicInformation } from "./_components/BasicInformation"
import { Services } from "./_components/Services"
import { SettlementAccount } from "./_components/SettlementAccount"

const tabItems = (tabProps: any = {}): TabItem[] => [
  {
    label: "Basic Information",
    value: "basic_information",
    component: () => <BasicInformation {...tabProps} />,
  },
  {
    label: "Services",
    value: "services",
    component: () => <Services {...tabProps} />,
  },
  {
    label: "Settlement Account",
    value: "settlement_account",
    component: () => <SettlementAccount {...tabProps} />,
  },
]

const CreateBank = () => {
  const [id, setId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("basic_information")

  const changeTab = (value: string) => setActiveTab(value)

  return (
    <Tabs title="Options" items={tabItems({ id, setId, changeTab })} activeTab={activeTab} onTabChange={setActiveTab} />
  )
}

export default CreateBank
