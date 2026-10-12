import { Card } from "../components/Card"
import { PageHeader } from "../components/PageHeader"
import { RecipeForm } from "../components/RecipeForm"

export function NewRecipePage() {
  return (
    <>
      <PageHeader title="New recipe">
        Images and video upload straight to storage while you fill in the form.
      </PageHeader>
      <Card>
        <RecipeForm />
      </Card>
    </>
  )
}
