import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Descriptions,
  Empty,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Rate,
  Result,
  Select,
  Table,
  Tag,
} from "@kooyaph/ui/components";
import { DemoFrame, optionList } from "./shared";
import { cartTotal } from "./state";
export const products = [
  {
    id: "notebook",
    name: "Everyday notebook",
    category: "Stationery",
    price: 24,
    mark: "N",
    description:
      "A paper companion for plans, sketches and the next good idea.",
  },
  {
    id: "planner",
    name: "Weekly planner",
    category: "Stationery",
    price: 32,
    mark: "W",
    description: "A little structure for the work that matters.",
  },
  {
    id: "tote",
    name: "Studio tote",
    category: "Accessories",
    price: 40,
    mark: "T",
    description: "A simple carry for your everyday essentials.",
  },
  {
    id: "mug",
    name: "Morning mug",
    category: "Workspace",
    price: 28,
    mark: "M",
    description: "A thoughtful pause between one good thing and the next.",
  },
];
export function CommerceDemo({
  family = "product-grid",
  alternate = false,
  embedded = false,
}: {
  family?: string;
  alternate?: boolean;
  embedded?: boolean;
}) {
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>(
    ["cart", "checkout", "coupon", "receipt"].includes(family)
      ? alternate
        ? [
            { id: "planner", quantity: 2 },
            { id: "mug", quantity: 3 },
          ]
        : [
            { id: "notebook", quantity: 1 },
            { id: "tote", quantity: 1 },
          ]
      : [],
  );
  const [wishlist, setWishlist] = useState<string[]>(
    family === "wishlist"
      ? alternate
        ? []
        : ["notebook", "tote"]
      : alternate && family === "product-card"
        ? ["notebook"]
        : [],
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(
    alternate && family === "filters" ? "Stationery" : "All",
  );
  const [sort, setSort] = useState(
    alternate ? "Price: low to high" : "Featured",
  );
  const [coupon, setCoupon] = useState(alternate ? "KOOYA10" : "");
  const [applied, setApplied] = useState(alternate ? "KOOYA10" : "");
  const [delivery, setDelivery] = useState(
    alternate ? "Collect in studio" : "Standard",
  );
  const [notice, setNotice] = useState("");
  const [detail, setDetail] = useState<string | null>(
    family === "product-details" ? (alternate ? "tote" : "notebook") : null,
  );
  const [placed, setPlaced] = useState(family === "receipt");
  const [reviews, setReviews] = useState<
    { id: string; name: string; rating: number; text: string }[]
  >(
    alternate
      ? []
      : [
          {
            id: "1",
            name: "Maya",
            rating: 5,
            text: "A lovely addition to the studio.",
          },
          {
            id: "2",
            name: "Jordan",
            rating: 4,
            text: "Simple, useful, and thoughtfully made.",
          },
        ],
  );
  const [reviewForm] = Form.useForm();
  const add = (id: string) => {
    setCart((current) =>
      current.some((item) => item.id === id)
        ? current.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...current, { id, quantity: 1 }],
    );
    setNotice(
      `${products.find((product) => product.id === id)?.name} added to cart.`,
    );
  };
  const cartRows = cart.map((item) => ({
    ...products.find((product) => product.id === item.id)!,
    quantity: item.quantity,
  }));
  const total = cartTotal(cartRows, applied);
  let visible = products.filter(
    (product) =>
      (category === "All" || product.category === category) &&
      product.name.toLowerCase().includes(query.toLowerCase()) &&
      (family !== "wishlist" || wishlist.includes(product.id)),
  );
  if (sort === "Price: low to high")
    visible = [...visible].sort((a, b) => a.price - b.price);
  const productCards = (
    <div
      className={
        alternate && ["product-card", "product-grid"].includes(family)
          ? "composition-stack"
          : "composition-grid"
      }
    >
      {(family === "product-card" ? visible.slice(0, 1) : visible).map(
        (product) => (
          <Card
            className={`composition-product ${alternate && family === "product-card" ? "composition-product-row" : ""}`}
            key={product.id}
          >
            <div
              className="composition-product-art"
              role="img"
              aria-label={`${product.name} typographic product artwork`}
            >
              <span>{product.mark}</span>
            </div>
            <Tag>{product.category}</Tag>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span className="composition-price">
              ${product.price.toFixed(2)}
            </span>
            <div className="composition-row">
              <Button type="primary" onClick={() => add(product.id)}>
                Add to cart
              </Button>
              <Button
                aria-label={`${wishlist.includes(product.id) ? "Remove" : "Save"} ${product.name} ${wishlist.includes(product.id) ? "from" : "to"} wishlist`}
                onClick={() =>
                  setWishlist((current) =>
                    current.includes(product.id)
                      ? current.filter((id) => id !== product.id)
                      : [...current, product.id],
                  )
                }
              >
                {wishlist.includes(product.id) ? "Saved ♥" : "Save ♡"}
              </Button>
              <Button onClick={() => setDetail(product.id)}>Details</Button>
            </div>
          </Card>
        ),
      )}
    </div>
  );
  const cartView = (
    <div className="composition-stack">
      {cartRows.length ? (
        cartRows.map((product) => (
          <div className="composition-cart-row" key={product.id}>
            <div>
              <h4>{product.name}</h4>
              <span>${product.price.toFixed(2)} each</span>
            </div>
            <InputNumber
              aria-label={`${product.name} quantity`}
              min={1}
              max={20}
              value={product.quantity}
              onChange={(value) =>
                setCart((current) =>
                  current.map((item) =>
                    item.id === product.id
                      ? { ...item, quantity: value ?? 1 }
                      : item,
                  ),
                )
              }
            />
            <strong>${(product.price * product.quantity).toFixed(2)}</strong>
            <Button
              onClick={() =>
                setCart((current) =>
                  current.filter((item) => item.id !== product.id),
                )
              }
            >
              Remove
            </Button>
          </div>
        ))
      ) : (
        <Empty description="Your cart is empty" />
      )}
      <div className="composition-row">
        <Input
          aria-label="Coupon code"
          placeholder="Try KOOYA10"
          style={{ maxWidth: 200 }}
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <Button
          onClick={() => {
            if (coupon.trim().toUpperCase() === "KOOYA10") {
              setApplied("KOOYA10");
              setNotice("10% demo discount applied.");
            } else {
              setApplied("");
              setNotice("That code is not valid. Try KOOYA10.");
            }
          }}
        >
          Apply coupon
        </Button>
      </div>
      {applied && <Tag color="success">KOOYA10 · 10% off</Tag>}
      <p className="composition-total">Total: ${total.toFixed(2)}</p>
    </div>
  );
  const checkout = (
    <Form
      layout="vertical"
      onFinish={() => {
        setPlaced(true);
        setNotice("Demo order placed. No payment was collected.");
      }}
    >
      <Form.Item
        name="name"
        label="Full name"
        rules={[{ required: true, whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input type="email" />
      </Form.Item>
      {delivery === "Standard" ? (
        <Form.Item
          name="address"
          label="Shipping address"
          rules={[{ required: true, whitespace: true }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
      ) : (
        <Alert
          type="success"
          title="Collect at the fictional Northstar studio"
          description="Your local order needs no shipping address. Switch to Standard delivery to enter one."
        />
      )}
      <Form.Item name="delivery" label="Delivery" initialValue={delivery}>
        <Radio.Group
          options={["Standard", "Collect in studio"]}
          onChange={(event) => setDelivery(event.target.value)}
        />
      </Form.Item>
      <Alert
        type="info"
        title="Local checkout demonstration"
        description="No card details, order submission or payment service is connected."
      />
      <Button
        style={{ marginTop: 20 }}
        type="primary"
        htmlType="submit"
        disabled={!cart.length}
      >
        Place demo order · ${total.toFixed(2)}
      </Button>
    </Form>
  );
  let body;
  if (placed)
    body = (
      <Result
        status="success"
        title="Order confirmed locally"
        subTitle="Demo receipt KOOYA-1001 · No payment collected"
        extra={
          <Button
            onClick={() => {
              setPlaced(false);
              setNotice("");
            }}
          >
            Back to cart
          </Button>
        }
      >
        <Descriptions
          column={1}
          items={[
            { key: "total", label: "Total", children: `$${total.toFixed(2)}` },
            {
              key: "items",
              label: "Items",
              children: cartRows
                .map((row) => `${row.name} × ${row.quantity}`)
                .join(", "),
            },
            {
              key: "delivery",
              label: "Delivery",
              children: `${delivery} · Local example — no shipment`,
            },
          ]}
        />
      </Result>
    );
  else if (["cart", "coupon", "checkout", "receipt"].includes(family))
    body = (
      <div
        className={
          family === "checkout" ? "composition-split" : "composition-stack"
        }
      >
        <div>{cartView}</div>
        {family === "checkout" ? (
          checkout
        ) : (
          <Button
            type="primary"
            disabled={!cart.length}
            onClick={() => setPlaced(true)}
          >
            Complete demo order
          </Button>
        )}
      </div>
    );
  else if (family === "comparison")
    body = (
      <>
        <Table
          rowKey="id"
          pagination={false}
          scroll={{ x: 500 }}
          dataSource={products.slice(0, alternate ? 4 : 3)}
          columns={[
            { title: "Product", dataIndex: "name" },
            { title: "Category", dataIndex: "category" },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => `$${value}`,
            },
            {
              title: "Choose",
              render: (_, product) => (
                <Button onClick={() => add(product.id)}>Add to cart</Button>
              ),
            },
          ]}
        />
      </>
    );
  else if (family === "reviews")
    body = (
      <div className="composition-split">
        <div className="composition-stack">
          {!reviews.length && (
            <Empty description="No reviews yet. Write the first local review." />
          )}
          {reviews.map((review) => (
            <Card key={review.id} title={review.name}>
              <Rate disabled value={review.rating} />
              <p>{review.text}</p>
            </Card>
          ))}
        </div>
        <Form
          form={reviewForm}
          layout="vertical"
          onFinish={(values) => {
            setReviews((current) => [
              ...current,
              { id: crypto.randomUUID(), ...values },
            ]);
            reviewForm.resetFields();
            setNotice("Your review was added locally.");
          }}
        >
          <Form.Item label="Your name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Rating" name="rating" initialValue={5}>
            <Rate />
          </Form.Item>
          <Form.Item label="Review" name="text" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add review
          </Button>
        </Form>
      </div>
    );
  else if (family === "category-grid")
    body = (
      <div className="composition-grid">
        {["Stationery", "Accessories", "Workspace"].map((value) => (
          <Card key={value} title={value}>
            <p>
              {products.filter((product) => product.category === value).length}{" "}
              products
            </p>
            <Button onClick={() => setCategory(value)}>Browse {value}</Button>
          </Card>
        ))}
        <div style={{ gridColumn: "1/-1" }}>{productCards}</div>
      </div>
    );
  else
    body = (
      <div className="composition-stack">
        {["product-grid", "filters", "wishlist"].includes(family) && (
          <div className="composition-toolbar">
            <Input.Search
              aria-label="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a product"
            />
            <Select
              aria-label="Product category"
              value={category}
              onChange={setCategory}
              options={optionList([
                "All",
                "Stationery",
                "Accessories",
                "Workspace",
              ])}
            />
            <Select
              aria-label="Product order"
              value={sort}
              onChange={setSort}
              options={optionList(["Featured", "Price: low to high"])}
            />
          </div>
        )}
        {visible.length ? (
          productCards
        ) : family === "wishlist" ? (
          <Empty description="Your wishlist is empty">
            <Button onClick={() => setWishlist(["planner"])}>
              Save a suggested product
            </Button>
          </Empty>
        ) : (
          <Empty description="No products match this view" />
        )}
        {family === "filters" && (
          <Button
            onClick={() => {
              setQuery("");
              setCategory("All");
              setSort("Featured");
            }}
          >
            Reset filters
          </Button>
        )}
      </div>
    );
  const selectedProduct = products.find((product) => product.id === detail);
  const content = (
    <>
      <div className="composition-row">
        <Tag>
          {cart.reduce((sum, item) => sum + item.quantity, 0)} items in cart
        </Tag>
        <Tag>{wishlist.length} saved</Tag>
      </div>
      {body}
      <p role="status">{notice}</p>
      <Modal
        title={selectedProduct?.name}
        open={!!selectedProduct}
        onCancel={() => setDetail(null)}
        footer={
          <Button
            type="primary"
            onClick={() => selectedProduct && add(selectedProduct.id)}
          >
            Add to cart
          </Button>
        }
      >
        <div className="composition-product-art">
          <span>{selectedProduct?.mark}</span>
        </div>
        <p style={{ marginTop: 20 }}>{selectedProduct?.description}</p>
        <strong>${selectedProduct?.price.toFixed(2)}</strong>
        <p>Fictional studio product · Local demonstration</p>
      </Modal>
    </>
  );
  return embedded ? (
    <div className="composition-stack">{content}</div>
  ) : (
    <DemoFrame title={family.replace(/-/g, " ")} alternate={alternate}>
      {content}
    </DemoFrame>
  );
}
