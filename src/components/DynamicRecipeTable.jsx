import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function DynamicRecipeTable({ title, recipe, onChange, colorTheme }) {
    const MAX_ROWS = 20;

    const addRow = () => {
        if (recipe.length < MAX_ROWS) {
            onChange([...recipe, { materialName: '', amount: '', ratio: '' }]);
        }
    };

    const removeRow = (index) => {
        const newRecipe = [...recipe];
        newRecipe.splice(index, 1);
        if (newRecipe.length === 0) {
            newRecipe.push({ materialName: '', amount: '', ratio: '' });
        }
        onChange(newRecipe);
    };

    const handleChange = (index, field, value) => {
        const newRecipe = [...recipe];
        newRecipe[index] = { ...newRecipe[index], [field]: value };
        onChange(newRecipe);
    };

    const inputClass = "w-full p-2.5 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-1 focus:ring-primary-500 outline-none text-sm transition-shadow";

    // Theme colors based on layer type
    const isMatte = colorTheme === 'matte';
    const headerBg = isMatte ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-orange-50 dark:bg-orange-900/30';
    const headerText = isMatte ? 'text-blue-700 dark:text-blue-300' : 'text-orange-700 dark:text-orange-300';
    const btnBg = isMatte ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300';

    return (
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className={`flex justify-between items-center p-3 ${headerBg}`}>
                <h3 className={`font-bold text-sm ${headerText}`}>
                    {title} (최대 {MAX_ROWS}개)
                </h3>
                <button
                    type="button"
                    onClick={addRow}
                    disabled={recipe.length >= MAX_ROWS}
                    className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-md disabled:opacity-50 font-bold ${btnBg}`}
                >
                    <Plus size={14} />
                    <span>행 추가</span>
                </button>
            </div>

            <div className="overflow-x-auto pb-2">
                <div className="min-w-[420px] px-2 pt-2">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-1 mb-2 font-bold text-[11px] text-center text-gray-400">
                        <div className="col-span-5 text-left pl-1">재료명 (Material)</div>
                        <div className="col-span-3">투입량</div>
                        <div className="col-span-3">비율 (%)</div>
                        <div className="col-span-1"></div>
                    </div>

                    {/* Rows */}
                    <div className="space-y-1.5">
                        {recipe.map((row, idx) => (
                            <div key={idx} className="grid grid-cols-12 gap-1 items-center">
                                <div className="col-span-5">
                                    <input
                                        type="text"
                                        value={row.materialName}
                                        onChange={(e) => handleChange(idx, 'materialName', e.target.value)}
                                        placeholder="재료명"
                                        className={inputClass}
                                    />
                                </div>
                                <div className="col-span-3">
                                    <input
                                        type="number"
                                        value={row.amount}
                                        onChange={(e) => handleChange(idx, 'amount', e.target.value)}
                                        placeholder="0"
                                        className={`${inputClass} text-center`}
                                    />
                                </div>
                                <div className="col-span-3">
                                    <input
                                        type="number"
                                        value={row.ratio}
                                        onChange={(e) => handleChange(idx, 'ratio', e.target.value)}
                                        placeholder="0"
                                        className={`${inputClass} text-center`}
                                    />
                                </div>
                                <div className="col-span-1 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => removeRow(idx)}
                                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
