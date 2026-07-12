class AddDateToExpenses < ActiveRecord::Migration[7.2]
  def up
    return if column_exists?(:expenses, :date)
    add_column :expenses, :date, :date, null: false, default: -> { "CURRENT_DATE" }
  end

  def down
    remove_column :expenses, :date if column_exists?(:expenses, :date)
  end
end
