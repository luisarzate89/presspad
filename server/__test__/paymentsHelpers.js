const { compareInstallments } = require("../helpers/payments");

test("Compare installments upFront installment", () => {
  const newInstallments = { key: 1, amount: 100, dueDate: "2019-09-02T16:54:11.391Z" };
  const oldInstallments = { key: 1, amount: 100, dueDate: "2019-09-02T20:54:11.391Z" };

  expect(compareInstallments(oldInstallments, newInstallments)).toBe(true);
});

test("Compare installments upFront installment fail", () => {
  const newInstallments = { key: 1, amount: 100, dueDate: "2019-09-02T16:54:11.391Z" };
  const oldInstallments = { key: 1, amount: 100, dueDate: "2019-09-03T20:54:11.391Z" };

  expect(compareInstallments(oldInstallments, newInstallments)).toBe(false);
});

test("Compare installments upFront installment fail", () => {
  const newInstallments = { key: 1, amount: 100, dueDate: "2019-09-02T16:54:11.391Z" };
  const oldInstallments = { key: 1, amount: 100.5, dueDate: "2019-09-02T20:54:11.391Z" };

  expect(compareInstallments(oldInstallments, newInstallments)).toBe(false);
});

test("Compare installments three installments", () => {
  const newInstallments = [
    { key: 1, amount: 100, dueDate: "2019-09-02T16:54:11.391Z" },
    { key: 2, amount: 99, dueDate: "2019-09-12T16:54:11.391Z" },
    { key: 3, amount: 88, dueDate: "2019-09-24T16:54:11.391Z" },
  ];
  const oldInstallments = [
    { key: 1, amount: 100, dueDate: "2019-09-02T00:54:11.391Z" },
    { key: 2, amount: 99, dueDate: "2019-09-12T00:54:11.391Z" },
    { key: 3, amount: 88, dueDate: "2019-09-24T00:54:11.391Z" },
  ];
  expect(compareInstallments(oldInstallments, newInstallments)).toBe(true);
});

test("Compare installments three installments fail", () => {
  const newInstallments = [
    { key: 1, amount: 100, dueDate: "2019-09-02T16:54:11.391Z" },
    { key: 2, amount: 99, dueDate: "2019-09-12T16:54:11.391Z" },
    { key: 3, amount: 88, dueDate: "2019-09-24T16:54:11.391Z" },
  ];
  const oldInstallments = [
    { key: 1, amount: 100, dueDate: "2019-09-02T00:54:11.391Z" },
    { key: 2, amount: 99, dueDate: "2019-09-13T00:54:11.391Z" },
    { key: 3, amount: 88, dueDate: "2019-09-24T00:54:11.391Z" },
  ];
  expect(compareInstallments(oldInstallments, newInstallments)).toBe(false);
});

test("Compare installments three installments fail", () => {
  const newInstallments = [
    { key: 1, amount: 100, dueDate: "2019-09-02T16:54:11.391Z" },
    { key: 2, amount: 99.02, dueDate: "2019-09-12T16:54:11.391Z" },
    { key: 3, amount: 88, dueDate: "2019-09-24T16:54:11.391Z" },
  ];
  const oldInstallments = [
    { key: 1, amount: 100, dueDate: "2019-09-02T00:54:11.391Z" },
    { key: 2, amount: 99, dueDate: "2019-09-12T00:54:11.391Z" },
    { key: 3, amount: 88, dueDate: "2019-09-24T00:54:11.391Z" },
  ];
  expect(compareInstallments(oldInstallments, newInstallments)).toBe(false);
});
