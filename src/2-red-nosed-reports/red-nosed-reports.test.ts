import { describe, expect, test } from "vitest";
import { safeReports } from "./red-nosed-reports.js";

const sampleInput = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9],
];

const puzzleInput = [
  [22, 25, 27, 28, 30, 31, 32, 29],
  [72, 74, 75, 77, 80, 81, 81],
  [52, 53, 55, 58, 59, 63],
  [14, 17, 19, 22, 27],
  [65, 68, 67, 68, 71, 73, 76, 77],
  [53, 56, 53, 55, 54],
  [60, 62, 59, 62, 62],
  [27, 30, 28, 31, 32, 35, 39],
  [64, 67, 68, 71, 74, 71, 74, 81],
  [29, 32, 32, 33, 36, 39, 40],
  [72, 74, 74, 75, 74],
  [11, 14, 14, 17, 17],
  [64, 65, 67, 70, 72, 72, 76],
  [77, 79, 80, 80, 82, 89],
  [45, 47, 49, 53, 54],
  [13, 16, 18, 22, 23, 25, 27, 24],
  [16, 17, 18, 19, 20, 21, 25, 25],
  [25, 26, 30, 32, 34, 35, 36, 40],
  [45, 48, 52, 54, 56, 62],
  [51, 52, 54, 56, 59, 64, 66, 68],
  [14, 16, 17, 22, 23, 22],
  [27, 28, 34, 35, 35],
  [76, 77, 78, 80, 85, 88, 92],
  [72, 74, 79, 80, 81, 88],
  [63, 62, 65, 66, 69, 70, 72],
  [87, 84, 87, 89, 88],
  [41, 40, 42, 43, 45, 46, 46],
  [7, 4, 7, 8, 12],
  [86, 83, 85, 88, 90, 96],
  [24, 21, 22, 24, 26, 28, 27, 28],
  [25, 24, 22, 24, 25, 23],
  [37, 36, 38, 39, 37, 39, 39],
  [78, 77, 80, 79, 80, 82, 86],
  [32, 30, 33, 35, 34, 35, 42],
  [70, 68, 70, 73, 73, 76],
  [60, 58, 59, 60, 61, 61, 59],
  [85, 83, 86, 86, 86],
  [3, 1, 1, 2, 4, 8],
  [21, 18, 19, 19, 26],
  [59, 56, 57, 59, 63, 64],
  [48, 45, 47, 48, 52, 53, 50],
  [43, 40, 44, 47, 49, 52, 52],
  [48, 45, 47, 51, 55],
  [54, 51, 52, 54, 57, 58, 62, 67],
  [21, 19, 20, 22, 29, 31],
  [32, 29, 31, 34, 39, 41, 44, 41],
  [47, 46, 48, 49, 54, 57, 57],
  [77, 74, 77, 82, 86],
  [47, 44, 45, 51, 54, 60],
  [55, 55, 57, 58, 59, 62, 65, 68],
  [40, 40, 41, 44, 41],
  [45, 45, 47, 48, 50, 50],
  [77, 77, 80, 81, 83, 85, 89],
  [28, 28, 30, 31, 38],
  [88, 88, 89, 88, 90, 93],
  [31, 31, 34, 36, 34, 35, 37, 35],
  [31, 31, 34, 36, 33, 33],
  [49, 49, 47, 48, 49, 53],
  [69, 69, 72, 73, 71, 76],
  [91, 91, 94, 96, 96, 99],
  [65, 65, 65, 68, 70, 71, 68],
  [50, 50, 51, 52, 52, 55, 58, 58],
  [75, 75, 78, 79, 79, 83],
  [6, 6, 8, 10, 10, 13, 16, 21],
  [43, 43, 46, 47, 51, 52, 54],
  [11, 11, 13, 16, 19, 22, 26, 24],
  [76, 76, 77, 80, 84, 84],
  [19, 19, 23, 24, 27, 31],
  [8, 8, 10, 12, 15, 19, 26],
  [71, 71, 76, 79, 80],
  [12, 12, 15, 17, 24, 25, 24],
  [8, 8, 9, 10, 11, 12, 19, 19],
  [74, 74, 76, 83, 85, 89],
  [65, 65, 67, 73, 74, 75, 78, 85],
  [23, 27, 30, 32, 33],
  [70, 74, 75, 78, 75],
  [7, 11, 12, 13, 14, 17, 17],
  [66, 70, 71, 74, 78],
  [61, 65, 68, 71, 76],
  [1, 5, 4, 7, 9, 10, 11],
  [47, 51, 53, 54, 55, 53, 54, 51],
  [56, 60, 63, 64, 66, 64, 67, 67],
  [36, 40, 43, 41, 42, 44, 48],
  [81, 85, 83, 85, 92],
  [69, 73, 73, 75, 78, 81, 82],
  [37, 41, 44, 44, 47, 48, 45],
  [41, 45, 45, 48, 49, 51, 51],
  [43, 47, 47, 49, 51, 55],
  [36, 40, 40, 41, 42, 49],
  [71, 75, 76, 79, 83, 84, 86, 89],
  [10, 14, 15, 19, 20, 17],
  [15, 19, 21, 25, 25],
  [1, 5, 8, 10, 12, 13, 17, 21],
  [73, 77, 80, 84, 89],
  [7, 11, 14, 17, 18, 25, 27],
  [53, 57, 64, 67, 68, 67],
  [50, 54, 55, 56, 62, 62],
  [31, 35, 36, 39, 42, 48, 51, 55],
  [35, 39, 42, 45, 48, 54, 60],
  [21, 27, 29, 30, 31],
  [40, 47, 48, 50, 48],
  [68, 75, 77, 78, 79, 80, 81, 81],
  [19, 24, 26, 28, 31, 34, 38],
  [72, 79, 82, 85, 92],
  [51, 57, 55, 56, 57, 59, 62, 63],
  [83, 90, 92, 93, 96, 99, 98, 97],
  [10, 16, 14, 16, 16],
  [34, 41, 40, 43, 46, 50],
  [70, 75, 76, 79, 77, 79, 86],
  [42, 47, 47, 50, 53, 55, 56, 58],
  [54, 61, 62, 63, 66, 66, 68, 67],
  [2, 7, 7, 8, 9, 9],
  [71, 78, 78, 80, 84],
  [78, 84, 86, 89, 89, 92, 98],
  [10, 17, 19, 23, 24, 25],
  [37, 44, 47, 48, 52, 53, 55, 52],
  [74, 79, 80, 81, 82, 86, 87, 87],
  [6, 11, 13, 16, 17, 21, 25],
  [68, 73, 74, 78, 80, 82, 85, 91],
  [35, 41, 44, 49, 50],
  [18, 25, 26, 29, 34, 36, 39, 37],
  [66, 73, 75, 78, 79, 85, 85],
  [61, 67, 69, 75, 79],
  [49, 54, 55, 62, 63, 70],
  [99, 96, 94, 91, 90, 87, 88],
  [85, 84, 81, 80, 79, 78, 78],
  [25, 22, 21, 19, 16, 12],
  [43, 42, 41, 40, 38, 32],
  [27, 24, 27, 24, 21],
  [27, 24, 22, 20, 18, 16, 18, 20],
  [61, 60, 59, 58, 61, 59, 59],
  [31, 29, 31, 28, 25, 21],
  [40, 37, 35, 38, 35, 33, 30, 25],
  [87, 85, 83, 83, 82, 79],
  [48, 45, 44, 41, 41, 44],
  [73, 72, 71, 71, 71],
  [61, 59, 58, 58, 54],
  [19, 16, 15, 15, 12, 11, 4],
  [46, 43, 40, 39, 38, 34, 33, 30],
  [58, 57, 53, 51, 54],
  [60, 58, 54, 52, 51, 50, 50],
  [51, 50, 46, 44, 42, 38],
  [38, 36, 33, 29, 27, 25, 22, 15],
  [48, 46, 44, 38, 36],
  [40, 39, 37, 35, 34, 29, 26, 28],
  [50, 49, 48, 41, 38, 37, 34, 34],
  [65, 64, 61, 54, 51, 50, 46],
  [22, 20, 17, 14, 13, 8, 1],
  [83, 84, 82, 80, 78, 75, 74],
  [14, 16, 13, 10, 9, 6, 8],
  [26, 29, 28, 25, 22, 20, 17, 17],
  [12, 14, 11, 9, 7, 3],
  [67, 69, 67, 65, 59],
  [9, 10, 13, 11, 9, 8],
  [15, 18, 17, 19, 18, 20],
  [39, 40, 37, 39, 39],
  [27, 30, 27, 26, 27, 26, 25, 21],
  [57, 60, 59, 57, 55, 52, 55, 48],
  [31, 34, 31, 31, 28],
  [45, 47, 46, 45, 44, 44, 45],
  [48, 50, 48, 48, 46, 43, 42, 42],
  [53, 56, 53, 53, 52, 48],
  [43, 45, 45, 42, 37],
  [23, 26, 22, 20, 18, 16, 13],
  [32, 33, 31, 29, 26, 23, 19, 20],
  [41, 43, 42, 40, 36, 36],
  [49, 51, 49, 47, 43, 39],
  [15, 17, 15, 11, 10, 5],
  [71, 74, 69, 67, 66],
  [51, 54, 49, 47, 44, 46],
  [76, 78, 75, 73, 66, 66],
  [74, 75, 68, 66, 63, 61, 57],
  [94, 95, 92, 86, 85, 78],
  [51, 51, 48, 45, 44],
  [43, 43, 40, 37, 36, 34, 37],
  [78, 78, 77, 75, 73, 71, 70, 70],
  [15, 15, 14, 12, 8],
  [50, 50, 47, 45, 44, 41, 35],
  [88, 88, 89, 87, 85, 83, 82],
  [42, 42, 39, 41, 42],
  [91, 91, 90, 88, 91, 91],
  [51, 51, 50, 48, 50, 48, 44],
  [50, 50, 48, 46, 47, 44, 43, 37],
  [93, 93, 91, 91, 90, 89, 87],
  [6, 6, 6, 5, 7],
  [97, 97, 97, 95, 92, 92],
  [28, 28, 27, 26, 26, 23, 19],
  [15, 15, 15, 12, 5],
  [38, 38, 37, 35, 31, 28, 27, 25],
  [27, 27, 25, 22, 18, 20],
  [18, 18, 16, 12, 12],
  [34, 34, 31, 27, 23],
  [16, 16, 15, 11, 4],
  [50, 50, 43, 41, 40],
  [67, 67, 64, 63, 57, 59],
  [91, 91, 89, 83, 83],
  [21, 21, 18, 12, 10, 9, 5],
  [73, 73, 68, 67, 64, 57],
  [97, 93, 92, 90, 88, 87, 84],
  [17, 13, 10, 7, 4, 7],
  [78, 74, 71, 68, 68],
  [51, 47, 45, 42, 40, 38, 34],
  [26, 22, 21, 20, 14],
  [95, 91, 92, 90, 87],
  [38, 34, 32, 31, 33, 35],
  [55, 51, 48, 49, 47, 46, 46],
  [79, 75, 72, 69, 71, 69, 65],
  [70, 66, 64, 63, 66, 61],
  [45, 41, 41, 40, 38],
  [39, 35, 35, 32, 31, 29, 31],
  [6, 2, 2, 1, 1],
  [32, 28, 26, 24, 24, 20],
  [90, 86, 86, 85, 79],
  [80, 76, 73, 71, 67, 66],
  [31, 27, 23, 20, 18, 20],
  [72, 68, 66, 64, 60, 59, 56, 56],
  [20, 16, 12, 10, 6],
  [72, 68, 67, 63, 60, 59, 53],
  [92, 88, 85, 84, 78, 75, 73],
  [36, 32, 30, 24, 23, 20, 21],
  [75, 71, 69, 66, 63, 57, 55, 55],
  [98, 94, 92, 86, 85, 81],
  [74, 70, 67, 60, 57, 55, 52, 47],
  [48, 42, 39, 38, 37, 34, 31, 30],
  [88, 83, 81, 78, 76, 77],
  [15, 8, 5, 2, 1, 1],
  [75, 70, 69, 67, 65, 63, 59],
  [69, 64, 61, 60, 57, 56, 49],
  [45, 39, 36, 39, 36, 33, 30, 27],
  [60, 55, 56, 54, 52, 49, 47, 49],
  [64, 58, 57, 58, 58],
  [82, 75, 72, 71, 72, 70, 67, 63],
  [26, 19, 16, 19, 17, 15, 9],
  [26, 20, 18, 15, 15, 12],
  [54, 49, 46, 45, 45, 44, 47],
  [18, 12, 9, 9, 7, 7],
  [22, 16, 15, 15, 11],
  [74, 69, 67, 67, 61],
  [76, 70, 66, 63, 60],
  [18, 13, 12, 10, 7, 5, 1, 3],
  [48, 41, 37, 36, 35, 32, 32],
  [52, 47, 46, 42, 41, 40, 36],
  [84, 79, 76, 73, 69, 67, 65, 60],
  [51, 46, 43, 37, 35, 34],
  [28, 22, 21, 19, 14, 16],
  [32, 27, 26, 19, 19],
  [93, 88, 85, 83, 76, 72],
  [53, 47, 44, 37, 30],
  [5, 7, 8, 11, 11, 15],
  [25, 24, 27, 27, 26],
  [84, 86, 85, 84, 80, 79, 77],
  [44, 45, 43, 40, 37, 33],
  [17, 14, 16, 13, 6],
  [27, 27, 34, 36, 39, 42, 40],
  [36, 42, 45, 46, 51],
  [61, 54, 53, 50, 48],
  [58, 58, 60, 64, 65, 68, 72],
  [75, 78, 77, 74, 74],
  [75, 75, 72, 71, 70, 70, 64],
  [55, 55, 52, 49, 43, 41, 36],
  [84, 83, 80, 81, 80],
  [69, 73, 74, 76, 75, 79],
  [87, 80, 82, 79, 79],
  [48, 51, 50, 53, 55, 53],
  [83, 80, 82, 88, 93],
  [74, 74, 73, 70, 68, 67, 63],
  [66, 65, 66, 67, 70, 74, 77],
  [14, 14, 11, 9, 6, 3, 2, 1],
  [22, 22, 26, 28, 31, 33, 36, 36],
  [65, 65, 69, 71, 72],
  [58, 58, 51, 48, 45, 43, 42, 42],
  [89, 88, 89, 90, 93, 93],
  [8, 15, 19, 22, 24, 24],
  [35, 39, 40, 45, 44],
  [80, 86, 88, 90, 91, 92, 93],
  [41, 42, 39, 37, 34, 35],
  [72, 65, 62, 61, 57],
  [84, 88, 90, 89, 94],
  [24, 26, 26, 24, 23, 22, 21, 21],
  [61, 57, 57, 55, 54, 51, 50, 46],
  [15, 15, 15, 14, 10],
  [59, 55, 51, 50, 47, 45, 42],
  [89, 88, 86, 83, 80, 77, 70],
  [69, 72, 75, 79, 82, 84, 86, 93],
  [23, 25, 27, 29, 34, 35, 38, 39],
  [11, 11, 12, 12, 13, 13],
  [47, 43, 45, 44, 42, 39, 35],
  [31, 38, 41, 44, 47, 50, 50],
  [27, 25, 20, 17, 15, 13],
  [86, 82, 81, 75, 73, 76],
  [53, 52, 50, 51, 52, 54, 58],
  [87, 90, 91, 92, 96, 93],
  [58, 58, 58, 55, 54, 53, 53],
  [23, 22, 21, 20, 20, 19, 12],
  [5, 5, 8, 9, 12, 14, 15],
  [29, 33, 37, 38, 42],
  [57, 52, 48, 47, 44, 41, 39, 40],
  [94, 87, 85, 83, 82, 78, 75, 69],
  [89, 91, 90, 84, 83],
  [31, 34, 35, 35, 41],
  [96, 89, 88, 87, 85, 87, 84],
  [16, 16, 18, 15, 13, 11, 11],
  [37, 38, 41, 44, 44, 45],
  [49, 47, 50, 53, 56, 63],
  [31, 29, 27, 26, 23, 19, 18],
  [38, 39, 42, 45, 47, 49, 52, 57],
  [70, 76, 79, 83, 84, 85, 89],
  [42, 42, 43, 44, 45, 46, 50, 48],
  [62, 63, 62, 64, 65],
  [82, 81, 78, 77, 73, 66],
  [34, 34, 28, 25, 24],
  [41, 41, 43, 41, 38, 34],
  [16, 14, 13, 13, 11, 8, 7],
  [19, 19, 14, 11, 8, 4],
  [78, 71, 68, 68, 65, 64, 65],
  [85, 89, 93, 95, 96],
  [16, 21, 23, 25, 28, 30, 34],
  [18, 14, 10, 9, 6, 5, 6],
  [8, 3, 3, 2, 1],
  [24, 28, 29, 30, 33, 38, 39],
  [57, 54, 57, 55, 57],
  [11, 11, 13, 10, 10],
  [66, 65, 67, 73, 76, 77, 77],
  [3, 7, 10, 13, 16, 20],
  [2, 6, 8, 9, 11, 12, 15, 16],
  [67, 67, 67, 68, 65],
  [67, 62, 61, 60, 59, 59, 59],
  [11, 15, 15, 17, 17],
  [18, 19, 17, 15, 14, 8, 5, 8],
  [4, 4, 4, 7, 9, 11, 13, 19],
  [31, 27, 26, 25, 22, 22, 17],
  [58, 59, 60, 64, 67, 67],
  [81, 88, 90, 90, 91, 97],
  [31, 31, 32, 38, 41],
  [28, 26, 28, 30, 31, 29, 30, 36],
  [29, 29, 31, 34, 40, 44],
  [33, 30, 29, 28, 26, 22, 22],
  [93, 89, 88, 86, 85, 79, 78, 73],
  [68, 72, 75, 78, 80, 86, 86],
  [85, 86, 89, 93, 95],
  [47, 49, 46, 45, 44, 45, 41],
  [74, 73, 75, 76, 73],
  [38, 38, 39, 40, 41, 46, 48, 55],
  [54, 54, 55, 57, 58, 60, 60],
  [48, 53, 59, 60, 58],
  [91, 96, 94, 96, 95],
  [78, 81, 78, 77, 77, 75, 68],
  [34, 28, 30, 27, 23],
  [85, 81, 76, 73, 73],
  [30, 24, 21, 16, 18],
  [12, 17, 18, 21, 25, 26],
  [88, 85, 86, 89, 91, 95],
  [36, 40, 42, 40, 41, 39],
  [16, 16, 14, 11, 12, 9, 6, 4],
  [59, 59, 57, 53, 52, 51, 45],
  [44, 40, 37, 33, 30, 28, 25, 25],
  [28, 28, 31, 31, 34, 37, 39, 40],
  [57, 51, 48, 44, 41, 39, 38, 35],
  [44, 37, 32, 30, 27, 27],
  [1, 2, 3, 6, 5, 5],
  [84, 77, 74, 72, 71, 69, 69],
  [44, 42, 40, 37, 36],
  [60, 57, 54, 52, 51],
  [46, 49, 52, 55, 56, 58, 60, 62],
  [42, 45, 47, 50, 51, 54, 55],
  [61, 60, 58, 57, 55],
  [28, 30, 31, 34, 36, 39],
  [35, 33, 30, 28, 27, 24],
  [17, 18, 19, 20, 23, 25, 27],
  [92, 89, 87, 84, 82, 80],
  [72, 75, 77, 80, 83, 86, 87, 90],
  [86, 85, 82, 79, 78, 77, 75, 74],
  [24, 23, 21, 18, 15],
  [35, 36, 38, 41, 43, 44],
  [37, 40, 43, 46, 48, 49, 52, 53],
  [74, 71, 70, 68, 67, 66],
  [73, 72, 70, 69, 66, 64, 63, 62],
  [21, 18, 17, 15, 13, 10],
  [97, 96, 95, 93, 91, 89],
  [80, 83, 86, 89, 92, 94, 97],
  [13, 10, 8, 7, 6, 5, 3, 1],
  [3, 5, 7, 10, 13],
  [12, 13, 14, 15, 17, 20, 23],
  [22, 21, 18, 15, 14],
  [45, 44, 41, 40, 39, 36, 33, 30],
  [92, 91, 89, 87, 84, 83, 81, 78],
  [80, 77, 74, 71, 68, 65, 64, 61],
  [76, 75, 72, 69, 67, 64, 61, 59],
  [74, 71, 69, 68, 65],
  [3, 5, 6, 9, 10, 12, 15, 16],
  [67, 69, 70, 71, 74, 76, 79],
  [59, 58, 56, 55, 53, 52, 50, 48],
  [54, 51, 49, 46, 43, 42],
  [68, 70, 72, 74, 77],
  [89, 88, 87, 84, 83, 80, 77, 75],
  [16, 14, 13, 10, 9, 6, 4],
  [32, 29, 26, 23, 20],
  [46, 43, 41, 39, 38],
  [90, 93, 94, 96, 97],
  [82, 80, 79, 76, 74],
  [87, 85, 84, 82, 80, 77],
  [29, 31, 32, 35, 38, 40, 43],
  [32, 34, 37, 39, 41],
  [30, 29, 27, 24, 21],
  [70, 73, 74, 77, 80, 82, 84, 87],
  [7, 10, 12, 13, 16, 19, 20],
  [47, 48, 49, 51, 52, 53],
  [68, 69, 71, 73, 74, 75, 76],
  [66, 69, 70, 72, 73, 76, 79],
  [19, 22, 25, 27, 28, 31, 33],
  [13, 10, 7, 5, 2],
  [3, 6, 7, 8, 11, 13, 16, 17],
  [27, 28, 31, 34, 37, 40, 42, 43],
  [49, 52, 55, 56, 59, 60, 61, 63],
  [74, 73, 70, 68, 66, 65],
  [53, 54, 57, 60, 63, 64],
  [98, 97, 95, 94, 91, 90, 88, 87],
  [50, 53, 56, 57, 59, 60, 63],
  [36, 38, 39, 41, 43, 46, 47, 49],
  [82, 81, 80, 79, 78, 75],
  [3, 5, 7, 9, 11, 12, 13],
  [46, 47, 49, 50, 52, 54, 57, 59],
  [20, 21, 22, 23, 24, 26, 27, 29],
  [44, 42, 39, 36, 34, 33, 30, 28],
  [50, 53, 54, 55, 58, 60],
  [78, 75, 73, 70, 67],
  [30, 27, 26, 24, 23, 21, 18],
  [34, 33, 31, 29, 27, 26],
  [70, 69, 68, 66, 64, 63, 62],
  [65, 64, 63, 62, 61],
  [47, 44, 41, 38, 35, 33, 30, 28],
  [70, 68, 65, 64, 63, 60],
  [40, 37, 35, 33, 31, 28, 26, 25],
  [37, 39, 42, 43, 44],
  [15, 18, 19, 21, 23],
  [52, 51, 48, 47, 45, 42, 39],
  [48, 45, 43, 41, 38, 37, 34, 33],
  [36, 39, 42, 43, 45, 48, 51, 52],
  [78, 76, 75, 73, 72, 69],
  [43, 40, 37, 34, 32, 29, 28],
  [11, 12, 15, 16, 18, 20, 23, 24],
  [68, 71, 74, 75, 77],
  [18, 21, 23, 26, 28, 29],
  [50, 49, 46, 43, 42],
  [35, 33, 32, 31, 28, 26, 25],
  [11, 12, 13, 15, 17],
  [22, 19, 16, 14, 13, 11, 10],
  [96, 95, 93, 91, 89, 86],
  [20, 17, 16, 13, 12, 9, 6],
  [75, 73, 71, 69, 66, 63, 61, 59],
  [55, 57, 58, 61, 64, 65, 67],
  [56, 54, 51, 48, 46],
  [87, 89, 90, 93, 94, 97],
  [98, 96, 94, 91, 89, 87, 85, 82],
  [92, 90, 88, 87, 85],
  [48, 49, 52, 55, 57, 59, 60, 61],
  [34, 35, 36, 37, 39, 41, 43],
  [64, 62, 61, 59, 58, 57],
  [16, 19, 21, 24, 26],
  [90, 91, 93, 94, 97, 98],
  [71, 72, 73, 76, 77, 79],
  [56, 58, 61, 62, 64, 65],
  [14, 12, 9, 8, 7, 5],
  [1, 2, 3, 5, 8, 9, 10],
  [65, 67, 70, 72, 74, 77],
  [35, 38, 40, 42, 43],
  [21, 20, 17, 16, 15, 12, 10, 8],
  [1, 4, 6, 7, 10, 11, 14],
  [3, 5, 7, 8, 10],
  [79, 80, 82, 85, 86, 88, 91, 92],
  [35, 38, 41, 44, 47, 48, 50],
  [20, 17, 16, 15, 14, 13, 10],
  [17, 19, 21, 22, 23],
  [38, 40, 43, 44, 45],
  [38, 39, 42, 45, 48, 50, 53],
  [93, 91, 90, 87, 85, 83],
  [25, 23, 21, 19, 18, 17],
  [26, 27, 28, 30, 33, 36, 38],
  [48, 45, 44, 42, 40],
  [50, 48, 45, 44, 42, 40, 37, 36],
  [56, 57, 59, 60, 63, 64],
  [34, 31, 30, 29, 27, 24, 23],
  [80, 81, 84, 87, 88, 90, 91],
  [42, 41, 38, 36, 35, 33, 31, 29],
  [28, 31, 34, 36, 39, 40, 42],
  [15, 13, 12, 9, 7],
  [64, 65, 68, 69, 71, 72],
  [51, 48, 47, 45, 42, 40],
  [48, 45, 43, 40, 38, 37],
  [31, 30, 29, 27, 25],
  [24, 26, 28, 29, 31, 33, 34],
  [14, 17, 18, 20, 23, 25, 26, 28],
  [90, 91, 92, 94, 96, 99],
  [4, 5, 6, 8, 10, 11, 14],
  [24, 22, 19, 17, 16, 15],
  [54, 57, 58, 60, 63, 64, 65],
  [34, 37, 39, 40, 42, 44, 47, 49],
  [46, 45, 44, 42, 40],
  [20, 18, 16, 14, 13, 10, 8],
  [64, 66, 67, 70, 72],
  [97, 95, 94, 93, 91],
  [48, 45, 43, 42, 39, 38],
  [28, 26, 24, 22, 19, 16, 14, 11],
  [16, 18, 19, 21, 23, 26],
  [50, 52, 53, 56, 59],
  [79, 78, 76, 73, 71, 69],
  [46, 48, 50, 51, 52, 55, 57, 60],
  [43, 44, 46, 48, 51, 54, 55, 56],
  [40, 37, 36, 35, 34, 31],
  [83, 82, 79, 76, 75, 73],
  [57, 60, 61, 64, 65, 68, 71],
  [2, 4, 7, 8, 11, 13, 16],
  [20, 18, 16, 15, 13, 10, 7, 5],
  [57, 56, 55, 52, 50],
  [65, 68, 70, 71, 74, 76, 79],
  [4, 7, 10, 12, 15, 17, 19, 21],
  [59, 57, 56, 54, 51],
  [58, 59, 62, 63, 66],
  [22, 19, 17, 16, 13],
  [55, 56, 57, 60, 63],
  [23, 26, 27, 30, 31, 32, 35, 36],
  [17, 16, 14, 13, 11, 10],
  [60, 58, 55, 52, 51, 48, 47, 46],
  [85, 88, 89, 90, 92, 94],
  [20, 18, 17, 14, 11],
  [80, 83, 84, 87, 88, 90, 91],
  [30, 27, 25, 23, 20, 17],
  [30, 31, 33, 36, 39, 42, 43],
  [43, 45, 48, 50, 53, 54, 56],
  [50, 48, 47, 46, 43, 40, 39, 38],
  [47, 49, 50, 53, 55],
  [38, 37, 36, 34, 33],
  [53, 54, 55, 57, 58, 60, 63],
  [99, 96, 94, 92, 90],
  [77, 78, 80, 83, 84, 86],
  [33, 35, 36, 38, 40, 42, 45],
  [54, 57, 59, 61, 62],
  [61, 58, 57, 56, 55, 52, 50],
  [17, 18, 20, 23, 26],
  [44, 46, 47, 50, 53, 56, 57],
  [50, 47, 44, 41, 38, 37, 36],
  [33, 31, 30, 28, 25, 23, 22],
  [40, 37, 35, 34, 31],
  [32, 34, 35, 36, 38],
  [64, 62, 61, 58, 56, 53],
  [33, 36, 38, 40, 42, 44, 47, 50],
  [22, 19, 16, 14, 11, 9, 8, 6],
  [53, 55, 57, 58, 61, 63, 65],
  [85, 82, 81, 80, 78, 76, 73, 70],
  [33, 34, 35, 37, 38, 41, 43, 45],
  [17, 14, 11, 9, 7, 4],
  [59, 56, 55, 54, 52, 49, 47],
  [47, 48, 49, 51, 53, 56, 57],
  [54, 51, 49, 46, 45, 43, 41, 40],
  [35, 32, 29, 28, 25, 22, 19],
  [38, 40, 41, 42, 45],
  [71, 68, 65, 64, 63],
  [27, 28, 30, 32, 33, 36, 39, 42],
  [39, 41, 44, 46, 49, 50],
  [55, 58, 59, 62, 65, 68, 69],
  [41, 38, 35, 33, 30, 28, 25, 23],
  [51, 52, 55, 57, 58, 61, 63],
  [52, 53, 55, 56, 59, 62, 64],
  [18, 20, 21, 24, 25, 28, 30, 31],
  [48, 47, 44, 41, 40, 37],
  [96, 94, 91, 90, 87, 84, 81],
  [20, 18, 17, 16, 14, 13, 11],
  [83, 86, 88, 89, 90, 93, 95],
  [58, 57, 56, 54, 52, 49, 46, 43],
  [62, 63, 64, 66, 69, 70, 72, 73],
  [77, 74, 73, 70, 69],
  [97, 95, 92, 91, 89],
  [11, 13, 14, 16, 18, 21, 23, 26],
  [40, 42, 45, 47, 50, 53, 54, 57],
  [9, 8, 7, 5, 3, 2],
  [18, 16, 14, 12, 11, 8],
  [28, 31, 34, 37, 39],
  [53, 50, 47, 46, 43],
  [78, 81, 84, 87, 89, 90, 92, 93],
  [40, 39, 36, 35, 33],
  [75, 73, 72, 69, 68, 66, 63],
  [81, 83, 86, 88, 91, 92],
  [19, 20, 23, 25, 26, 27, 29, 31],
  [32, 31, 28, 26, 24],
  [70, 69, 68, 67, 64, 63, 62],
  [74, 76, 77, 78, 81, 83],
  [60, 57, 54, 52, 49, 47, 45],
  [64, 62, 61, 60, 59],
  [76, 78, 81, 84, 85],
  [85, 83, 82, 81, 78, 75],
  [57, 58, 60, 62, 64, 67, 70],
  [13, 15, 16, 19, 22, 24],
  [87, 85, 82, 81, 78, 75, 72],
  [36, 35, 32, 30, 27, 24, 21, 20],
  [38, 37, 35, 33, 31, 28],
  [47, 44, 41, 38, 35, 33, 32],
  [65, 62, 61, 60, 58, 57, 56],
  [58, 56, 54, 53, 50, 48, 46, 45],
  [64, 62, 60, 59, 57],
  [82, 85, 86, 88, 89, 91, 93],
  [22, 19, 18, 15, 12, 10, 9],
  [55, 58, 60, 62, 64, 66],
  [57, 54, 52, 50, 49, 47],
  [41, 38, 35, 33, 31, 29, 27],
  [81, 83, 84, 86, 87],
  [21, 18, 15, 14, 13],
  [62, 63, 64, 66, 67],
  [45, 43, 42, 40, 37, 34],
  [53, 51, 48, 46, 44, 42, 39],
  [50, 52, 53, 54, 56, 58, 61],
  [51, 54, 56, 59, 62, 63],
  [59, 58, 55, 54, 53, 50, 47, 44],
  [9, 11, 12, 13, 14, 16, 18, 21],
  [6, 8, 11, 12, 14, 17],
  [39, 42, 45, 47, 50, 51, 52, 55],
  [88, 86, 83, 82, 81, 78],
  [74, 75, 77, 79, 80, 82, 85, 86],
  [63, 66, 69, 70, 71, 74, 76, 77],
  [60, 59, 58, 57, 55, 54],
  [76, 78, 79, 82, 84],
  [9, 10, 12, 13, 14],
  [15, 17, 18, 20, 23, 25, 28, 30],
  [10, 11, 12, 13, 14],
  [71, 69, 66, 65, 63],
  [23, 22, 19, 16, 13, 11],
  [35, 33, 30, 27, 25],
  [13, 16, 17, 18, 19, 21, 23],
  [43, 46, 49, 50, 51],
  [61, 64, 67, 68, 71, 74, 77],
  [77, 74, 71, 68, 66, 64],
  [22, 25, 28, 31, 34, 35, 37],
  [81, 79, 78, 76, 74],
  [1, 2, 3, 4, 6, 7, 8, 11],
  [86, 89, 91, 93, 94],
  [21, 23, 24, 25, 26, 27, 30],
  [20, 18, 16, 13, 10, 8],
  [56, 53, 52, 51, 48, 46, 43],
  [18, 16, 13, 11, 10],
  [14, 13, 11, 8, 6],
  [97, 96, 93, 92, 89, 86, 83],
  [31, 30, 28, 25, 23, 20, 19, 18],
  [53, 52, 50, 47, 45, 42, 41, 38],
  [37, 38, 41, 44, 45, 47, 49],
  [58, 55, 54, 51, 50, 49, 48, 46],
  [89, 88, 86, 83, 80, 79],
  [40, 38, 37, 34, 31],
  [36, 34, 32, 30, 29],
  [71, 73, 74, 75, 77, 78],
  [53, 52, 51, 50, 49, 47],
  [19, 17, 16, 14, 11, 10, 8, 6],
  [87, 85, 82, 79, 76, 73, 70],
  [46, 48, 51, 54, 55],
  [82, 84, 87, 88, 91, 94, 96, 99],
  [76, 77, 79, 82, 85, 88, 89],
  [98, 96, 93, 90, 89, 86, 83],
  [89, 92, 95, 98, 99],
  [64, 66, 67, 69, 72],
  [19, 18, 16, 14, 12, 11, 8, 5],
  [77, 74, 71, 69, 68, 65, 62],
  [89, 92, 94, 97, 99],
  [29, 31, 33, 35, 37],
  [21, 23, 25, 26, 27, 29, 31, 32],
  [17, 20, 22, 24, 27, 29, 31],
  [47, 44, 43, 40, 37, 34],
  [6, 7, 9, 12, 13],
  [53, 50, 48, 45, 44, 41, 39],
  [33, 34, 36, 38, 39, 42, 45],
  [56, 58, 59, 62, 65, 68, 70],
  [40, 38, 36, 33, 31],
  [84, 82, 81, 78, 77, 75, 73],
  [18, 20, 23, 26, 29, 31, 33, 34],
  [52, 51, 49, 48, 45, 42, 39, 37],
  [76, 77, 80, 83, 84, 87, 88, 91],
  [29, 26, 23, 20, 17, 15, 12],
  [66, 65, 64, 62, 60, 58],
  [1, 2, 4, 6, 8, 9],
  [28, 25, 22, 19, 18, 16, 15],
  [94, 92, 90, 87, 86, 84],
  [36, 37, 39, 41, 42, 45, 48],
  [4, 7, 10, 13, 16, 19, 21, 23],
  [6, 7, 9, 10, 13],
  [26, 24, 21, 19, 16, 15],
  [77, 80, 82, 85, 86, 88],
  [68, 71, 73, 75, 76],
  [25, 24, 23, 21, 18, 15, 13],
  [37, 38, 40, 42, 44, 47, 49],
  [34, 36, 37, 38, 39],
  [85, 83, 81, 79, 77, 76],
  [30, 31, 34, 37, 40, 43, 46, 47],
  [37, 38, 39, 42, 44],
  [40, 41, 43, 45, 47, 48, 51],
  [58, 61, 62, 65, 67, 69, 70],
  [3, 6, 8, 9, 11, 12],
  [27, 26, 23, 21, 18],
  [57, 60, 62, 64, 65],
  [63, 64, 65, 68, 69, 72, 74, 75],
  [28, 26, 25, 22, 20, 18, 16, 13],
  [27, 28, 31, 34, 37, 38],
  [38, 36, 33, 32, 29, 26, 23],
  [74, 72, 69, 67, 65, 64, 62],
  [86, 87, 88, 91, 93, 96],
  [58, 57, 56, 55, 53, 51],
  [55, 58, 59, 62, 64, 66, 68, 70],
  [44, 45, 46, 49, 51],
  [45, 46, 48, 49, 52, 55, 58, 61],
  [17, 14, 13, 11, 8],
  [31, 30, 28, 25, 23, 22],
  [11, 12, 14, 17, 20],
  [10, 11, 14, 15, 18, 21, 23, 24],
  [46, 45, 43, 41, 39, 37],
  [52, 50, 49, 46, 45, 42],
  [85, 82, 81, 80, 78, 77],
  [16, 15, 12, 9, 6, 5, 2],
  [11, 12, 15, 18, 21, 22],
  [50, 49, 48, 45, 43, 40],
  [92, 89, 86, 85, 84],
  [29, 26, 23, 22, 19],
  [57, 60, 61, 62, 64, 67, 70, 72],
  [5, 6, 9, 10, 11],
  [26, 25, 24, 23, 21, 18, 17, 16],
  [17, 20, 23, 25, 27, 29, 32, 33],
  [23, 24, 26, 27, 30, 33, 36],
  [4, 5, 8, 9, 11, 13, 16],
  [76, 73, 71, 70, 67, 66, 64, 61],
  [67, 65, 64, 63, 61],
  [96, 95, 93, 92, 89],
  [71, 70, 67, 65, 63, 62, 59, 57],
  [40, 42, 45, 47, 50, 53, 55],
  [49, 48, 45, 43, 42, 40, 37],
  [85, 83, 81, 78, 76, 74],
  [28, 27, 25, 23, 22, 21],
  [83, 86, 87, 88, 89, 90, 93],
  [94, 91, 89, 86, 85, 82],
  [53, 50, 49, 48, 45, 44],
  [86, 83, 82, 81, 80, 78, 75, 72],
  [67, 69, 72, 75, 77],
  [56, 53, 50, 49, 46, 44],
  [74, 76, 79, 82, 83, 84, 85],
  [25, 27, 29, 31, 34],
  [18, 21, 22, 23, 25, 27, 29],
  [32, 31, 29, 27, 25],
  [55, 52, 51, 49, 46, 44],
  [22, 23, 26, 28, 30, 32],
  [9, 11, 14, 17, 19, 22, 24, 26],
  [53, 54, 55, 56, 59],
  [27, 29, 31, 33, 34],
  [34, 31, 28, 26, 24, 22],
  [86, 89, 90, 91, 94, 96],
  [85, 83, 81, 78, 75, 74, 71, 70],
  [84, 82, 81, 80, 77, 74],
  [48, 51, 52, 55, 57, 60],
  [43, 40, 38, 37, 35, 32, 30],
  [69, 72, 73, 74, 76, 79, 81, 84],
  [28, 30, 33, 35, 38, 40],
  [4, 7, 8, 11, 14, 16, 18, 20],
  [34, 33, 31, 30, 29, 26, 23, 22],
  [27, 25, 24, 22, 19, 16, 13, 12],
  [41, 44, 46, 48, 49, 50, 52, 53],
  [1, 2, 4, 6, 8, 9, 12, 14],
  [9, 10, 12, 15, 16, 19],
  [91, 93, 96, 97, 99],
  [49, 48, 46, 43, 40],
  [66, 65, 63, 62, 60, 57, 55],
  [24, 21, 19, 18, 15, 12],
  [66, 68, 70, 71, 72, 73, 74, 75],
  [5, 6, 9, 12, 15, 17],
  [20, 18, 17, 16, 14],
  [85, 86, 87, 88, 89, 90, 93, 95],
  [47, 44, 41, 40, 38, 36, 33],
  [60, 61, 63, 64, 67, 68],
  [88, 90, 91, 93, 95, 96],
  [45, 43, 41, 40, 37],
  [30, 31, 34, 37, 40],
  [23, 21, 19, 18, 15],
  [24, 23, 20, 19, 16, 15, 13, 12],
  [26, 28, 29, 32, 33, 34, 36],
  [67, 68, 69, 70, 73],
  [17, 20, 21, 24, 26, 29, 30],
  [19, 16, 13, 11, 8, 5, 4],
  [48, 49, 52, 55, 57, 58, 59],
  [50, 52, 53, 54, 57, 58],
  [60, 62, 65, 68, 71, 72, 73, 74],
  [67, 66, 65, 64, 61, 58, 57, 55],
  [50, 52, 53, 56, 57, 60, 62, 63],
  [10, 11, 14, 15, 18, 21],
  [32, 29, 27, 24, 21, 18, 17, 15],
  [50, 51, 53, 56, 57, 60],
  [35, 37, 38, 41, 43, 45],
  [67, 68, 71, 73, 75, 78, 79, 82],
  [35, 36, 38, 41, 43],
  [97, 95, 93, 91, 89, 87, 85],
  [78, 76, 74, 72, 70, 67, 64, 63],
  [80, 77, 75, 74, 73],
  [48, 46, 44, 42, 41],
  [27, 26, 23, 20, 18],
  [91, 88, 87, 84, 81],
  [99, 97, 96, 95, 92, 89, 87],
  [16, 14, 11, 10, 7, 5],
  [98, 95, 92, 90, 88, 86],
  [85, 86, 88, 89, 91, 93, 96, 97],
  [18, 17, 14, 11, 10],
  [19, 22, 23, 24, 25, 26, 27, 30],
  [50, 51, 52, 54, 57, 59, 60],
  [40, 43, 45, 47, 49, 51, 53],
  [60, 61, 62, 63, 64, 65, 67],
  [99, 97, 94, 93, 92, 89, 87, 86],
  [55, 54, 51, 49, 48],
  [47, 45, 43, 41, 38],
  [17, 20, 21, 24, 26, 29, 31],
  [44, 43, 41, 40, 37, 36, 35, 33],
  [82, 83, 86, 89, 91],
  [46, 48, 49, 50, 52, 54],
  [32, 35, 37, 40, 43],
  [82, 83, 86, 88, 89],
  [41, 40, 39, 38, 37],
  [28, 31, 32, 34, 35, 37, 38],
  [98, 97, 95, 93, 92, 90, 87],
  [23, 20, 17, 14, 13, 10, 9],
  [58, 60, 62, 65, 68, 70, 71, 73],
  [3, 4, 6, 9, 11],
  [77, 79, 81, 83, 86, 88, 91],
  [78, 76, 75, 73, 71],
  [62, 64, 67, 68, 70, 72],
  [41, 44, 47, 48, 49, 51],
  [79, 78, 75, 74, 72, 69],
  [48, 51, 53, 55, 57, 60, 62],
  [68, 65, 62, 59, 56, 54, 51, 48],
  [57, 59, 61, 62, 63, 66, 69, 72],
  [20, 23, 25, 26, 27, 28, 29],
  [48, 45, 43, 42, 39, 36, 33, 30],
  [36, 37, 38, 40, 43, 45, 47],
  [95, 93, 92, 89, 88],
  [54, 55, 57, 59, 61, 63, 66, 68],
  [14, 15, 17, 20, 21],
  [7, 9, 12, 13, 16, 18],
  [94, 91, 90, 89, 88, 87, 85, 83],
  [47, 44, 42, 39, 36, 34, 31],
  [28, 31, 34, 37, 38, 39],
  [54, 56, 58, 59, 60, 62],
  [89, 88, 87, 84, 82, 80, 79, 76],
  [78, 80, 83, 84, 87, 88],
  [21, 22, 23, 24, 27, 30, 32],
  [16, 15, 12, 10, 7, 5],
  [27, 29, 32, 34, 35, 36, 38],
  [58, 57, 55, 54, 52, 50, 49, 46],
  [47, 44, 41, 40, 37],
  [17, 16, 15, 14, 11, 10],
  [53, 51, 50, 47, 45, 43],
  [18, 16, 15, 13, 10, 8, 5, 3],
  [38, 36, 35, 32, 31, 30],
  [75, 76, 79, 81, 84, 87, 90, 93],
  [79, 81, 84, 85, 87],
  [31, 28, 25, 24, 22, 20, 17],
  [42, 44, 45, 46, 47, 49, 51],
  [51, 53, 54, 57, 58, 59],
  [92, 89, 87, 85, 83],
  [31, 34, 35, 38, 40, 42],
  [23, 21, 20, 19, 17],
  [52, 51, 50, 49, 46, 43, 41],
  [69, 66, 64, 63, 62],
  [87, 85, 82, 81, 79],
  [40, 43, 46, 48, 49, 50],
  [10, 11, 12, 15, 16],
  [15, 18, 20, 22, 24, 27, 28],
  [51, 53, 56, 58, 60, 63, 66],
  [3, 5, 8, 9, 11, 13],
  [89, 88, 86, 85, 83, 81, 79, 77],
  [63, 65, 68, 70, 73, 76, 78, 79],
  [14, 15, 16, 19, 22, 23, 24, 25],
  [73, 71, 70, 67, 65, 62, 59, 58],
  [52, 49, 46, 43, 41],
  [5, 7, 9, 11, 14, 17, 18],
  [52, 49, 46, 44, 43],
  [50, 52, 55, 58, 59],
  [24, 26, 27, 30, 31],
  [18, 21, 23, 26, 27],
  [18, 15, 13, 10, 8, 7, 4],
  [97, 96, 93, 90, 88, 87],
  [91, 90, 89, 87, 84, 83, 81],
  [80, 82, 84, 87, 89, 92],
  [33, 35, 36, 37, 40],
  [28, 31, 34, 35, 37, 38, 41],
  [20, 22, 24, 27, 30, 33, 34, 35],
  [26, 28, 30, 33, 36, 37, 38],
  [60, 61, 64, 67, 70],
  [93, 90, 87, 85, 82, 79, 77],
  [92, 89, 87, 86, 85],
  [94, 92, 89, 88, 87],
  [82, 83, 84, 87, 88, 90, 92],
  [64, 63, 60, 57, 56, 55, 53],
  [81, 79, 78, 75, 72, 70],
  [86, 84, 82, 79, 78, 75],
  [77, 75, 72, 70, 67],
  [73, 71, 69, 67, 65, 62, 61, 60],
  [68, 65, 62, 59, 58, 55, 53],
  [31, 34, 36, 38, 40, 43, 46],
  [59, 56, 53, 50, 48, 46, 45],
  [42, 44, 45, 47, 50],
  [53, 51, 50, 49, 48, 45, 42],
  [48, 45, 43, 40, 38, 35, 33, 30],
  [56, 59, 60, 62, 63],
  [56, 54, 52, 51, 48, 46, 44],
  [58, 56, 53, 52, 51, 49],
  [67, 69, 70, 72, 73, 74, 75],
  [85, 86, 88, 89, 91, 92],
  [97, 94, 91, 88, 85, 83, 81],
  [3, 5, 6, 8, 10, 12],
  [30, 28, 26, 25, 24, 21, 19],
  [57, 56, 55, 54, 53],
  [39, 41, 43, 46, 48, 51, 54, 56],
  [91, 93, 95, 96, 97, 98],
  [42, 40, 38, 36, 34],
  [76, 78, 80, 83, 86, 87, 88, 90],
  [31, 34, 35, 36, 38, 40],
  [15, 17, 20, 22, 23, 24],
  [85, 82, 79, 76, 75, 74],
  [68, 65, 64, 63, 61],
  [24, 27, 28, 29, 31, 34, 36],
  [43, 42, 39, 36, 34, 31, 29],
  [80, 81, 83, 85, 87, 89],
  [41, 40, 38, 36, 33],
  [14, 15, 17, 18, 21, 23, 26, 29],
  [36, 39, 40, 41, 43, 46],
  [97, 94, 92, 89, 88, 85, 83],
  [30, 31, 34, 35, 37],
  [99, 98, 96, 94, 91, 88, 85],
  [25, 26, 27, 28, 29],
  [13, 10, 8, 5, 4],
  [28, 31, 34, 37, 39, 40, 41],
  [62, 59, 58, 57, 56, 55, 52],
  [63, 64, 66, 69, 71, 74, 75],
  [81, 82, 85, 86, 88],
  [22, 24, 27, 28, 29, 31, 34],
  [94, 93, 90, 88, 87, 86, 85, 83],
  [67, 66, 64, 61, 59],
  [70, 71, 73, 76, 77],
  [81, 83, 85, 86, 88, 90, 91],
  [3, 6, 7, 8, 9],
  [53, 56, 57, 59, 62, 64, 65],
  [31, 28, 25, 23, 22, 21],
  [46, 47, 48, 49, 52, 55, 56, 58],
  [86, 89, 92, 93, 94, 95, 96],
  [78, 77, 76, 73, 72, 70, 68, 66],
  [88, 87, 86, 85, 84, 81, 78],
  [77, 75, 72, 69, 68, 65],
  [87, 88, 91, 92, 93, 94, 97, 99],
  [30, 27, 26, 23, 20],
  [71, 73, 75, 76, 77, 79, 80, 82],
  [61, 64, 67, 70, 71, 73, 76, 77],
  [53, 56, 58, 61, 62],
  [34, 32, 31, 28, 27, 26, 25, 22],
  [32, 34, 37, 40, 43, 44, 45],
  [44, 41, 38, 37, 34],
  [36, 35, 33, 31, 30, 27, 25, 23],
  [90, 87, 86, 84, 82],
  [31, 30, 27, 24, 22, 20, 18],
  [61, 59, 56, 53, 50, 47, 46, 43],
  [65, 63, 61, 59, 58, 57, 54, 51],
  [31, 29, 26, 23, 20, 18, 16, 14],
  [50, 52, 54, 55, 57],
  [30, 29, 28, 27, 26, 23, 22],
  [18, 21, 24, 27, 30, 32],
  [24, 21, 18, 15, 14, 12, 9],
  [37, 35, 34, 31, 30, 28, 25, 24],
  [17, 16, 14, 11, 10, 8],
  [39, 42, 43, 46, 48],
  [71, 73, 74, 76, 79, 80, 82, 83],
  [91, 88, 86, 85, 82, 80, 79],
  [34, 35, 37, 39, 42, 45, 47, 50],
  [32, 30, 28, 26, 23, 20],
  [26, 25, 23, 22, 19],
  [39, 38, 37, 34, 33, 31, 29, 28],
  [20, 23, 24, 27, 30],
  [14, 12, 10, 7, 5, 4, 2],
  [44, 43, 41, 39, 36, 34, 33],
  [82, 81, 79, 78, 76, 74],
  [67, 65, 63, 60, 57, 56, 54, 53],
  [54, 56, 57, 58, 59],
  [35, 34, 33, 31, 30, 27, 25, 24],
  [96, 93, 90, 87, 86],
  [87, 85, 84, 81, 80, 79, 78],
  [85, 82, 80, 78, 77, 74, 72, 71],
  [94, 91, 90, 87, 86, 85, 83, 80],
  [52, 53, 55, 58, 61],
  [56, 58, 61, 64, 67, 68, 69],
  [34, 35, 38, 41, 43, 45, 47],
  [1, 3, 5, 6, 7, 10, 13, 16],
  [62, 64, 67, 68, 69, 72],
  [14, 15, 16, 18, 21, 23, 26],
  [39, 37, 35, 34, 33, 30],
  [34, 31, 30, 29, 28],
  [12, 15, 18, 21, 23, 26, 28],
  [21, 20, 17, 15, 13],
  [87, 88, 90, 93, 95],
  [2, 3, 4, 7, 9, 10],
  [43, 46, 49, 52, 55, 56, 57, 58],
  [41, 44, 47, 48, 50, 53],
  [33, 31, 28, 27, 24, 22, 19],
  [36, 35, 32, 31, 28],
  [93, 91, 90, 89, 86, 85, 82, 80],
];

type TSafeReports = {
  input: number[][];
  output: number;
};

const SAFE_REPORTS_TEST_CASES: TSafeReports[] = [
  {
    input: sampleInput,
    output: 2,
  },
  {
    input: puzzleInput,
    output: 639,
  },
];

const SAFE_REPORTS_WITH_DAMPENER_TEST_CASES: TSafeReports[] = [
  {
    input: sampleInput,
    output: 4,
  },
  {
    input: puzzleInput,
    output: 674,
  },
];

describe("safeReports", () => {
  SAFE_REPORTS_TEST_CASES.forEach(t => {
    test(`should return ${t.output} when given ${JSON.stringify(t.input)}`, () => {
      expect(safeReports(t.input)).toBe(t.output);
    });
  });
  SAFE_REPORTS_WITH_DAMPENER_TEST_CASES.forEach(t => {
    test(`should return ${t.output} when given ${JSON.stringify(t.input)}`, () => {
      expect(safeReports(t.input, true)).toBe(t.output);
    });
  });
});
