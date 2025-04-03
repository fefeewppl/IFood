"use client";

import { Restaurant, CartItem, CheckoutInfo } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Remove the X import since we won't be adding our own close button

export default function Checkout({
  showCheckout,
  onCloseCheckout,
  checkoutInfo,
  onUpdateCheckoutInfo,
  cart,
  restaurant,
  orderPlaced,
  onPlaceOrder,
  addressSuggestions,
  isLoadingAddress,
  addressError,
  onSearchAddress,
  onSelectAddress
}: CheckoutProps) {
  return (
    <Dialog open={showCheckout} onOpenChange={onCloseCheckout}>
      <DialogContent className="max-w-md">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl">Finalizar Pedido</DialogTitle>
          {/* Remove our custom close button - the DialogContent already has one */}
        </DialogHeader>
        
        {!orderPlaced ? (
          <>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Seus dados</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md"
                    placeholder="Nome completo"
                    value={checkoutInfo.name}
                    onChange={(e) => onUpdateCheckoutInfo({ name: e.target.value })}
                  />
                  <input
                    type="tel"
                    className="w-full p-3 border rounded-md"
                    placeholder="Telefone com DDD"
                    value={checkoutInfo.phone}
                    onChange={(e) => onUpdateCheckoutInfo({ phone: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Endereço de entrega</h3>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-3 border rounded-md"
                      placeholder="Digite seu endereço"
                      value={checkoutInfo.address}
                      onChange={(e) => {
                        onUpdateCheckoutInfo({ address: e.target.value });
                        onSearchAddress(e.target.value);
                      }}
                    />
                    
                    {isLoadingAddress && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin h-5 w-5 border-2 border-gray-500 rounded-full border-t-transparent"></div>
                      </div>
                    )}
                    
                    {addressSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                        {addressSuggestions.map((suggestion, index) => (
                          <div 
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => onSelectAddress(suggestion)}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {addressError && (
                    <p className="text-red-500 text-sm">{addressError}</p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      className="p-3 border rounded-md"
                      placeholder="Cidade"
                      value={checkoutInfo.city}
                      onChange={(e) => onUpdateCheckoutInfo({ city: e.target.value })}
                    />
                    
                    <input
                      type="text"
                      className="p-3 border rounded-md"
                      placeholder="Estado"
                      value={checkoutInfo.state}
                      onChange={(e) => onUpdateCheckoutInfo({ state: e.target.value })}
                    />
                  </div>
                  
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md"
                    placeholder="Complemento, número, referência"
                    value={checkoutInfo.addressDetails}
                    onChange={(e) => onUpdateCheckoutInfo({ addressDetails: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Forma de pagamento</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="credit"
                      name="payment"
                      value="credit"
                      checked={checkoutInfo.paymentMethod === "credit"}
                      onChange={() => onUpdateCheckoutInfo({ paymentMethod: "credit" })}
                      className="mr-2"
                    />
                    <label htmlFor="credit">Cartão de crédito</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="debit"
                      name="payment"
                      value="debit"
                      checked={checkoutInfo.paymentMethod === "debit"}
                      onChange={() => onUpdateCheckoutInfo({ paymentMethod: "debit" })}
                      className="mr-2"
                    />
                    <label htmlFor="debit">Cartão de débito</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cash"
                      name="payment"
                      value="cash"
                      checked={checkoutInfo.paymentMethod === "cash"}
                      onChange={() => onUpdateCheckoutInfo({ paymentMethod: "cash" })}
                      className="mr-2"
                    />
                    <label htmlFor="cash">Dinheiro</label>
                  </div>
                  
                  {checkoutInfo.paymentMethod === "cash" && (
                    <div className="mt-2 pl-6">
                      <label htmlFor="change" className="block text-sm mb-1">Troco para:</label>
                      <input
                        type="text"
                        id="change"
                        className="p-2 border rounded-md w-full"
                        placeholder="R$ 0,00"
                        value={checkoutInfo.change}
                        onChange={(e) => onUpdateCheckoutInfo({ change: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Resumo do pedido</h3>
                <div className="space-y-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.quantity}x {item.name}</span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Subtotal</span>
                      <span>R$ {cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
                    </div>
                    {restaurant && (
                      <div className="flex justify-between">
                        <span>Taxa de entrega</span>
                        <span>R$ {restaurant.deliveryFee}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg mt-2">
                      <span>Total</span>
                      <span>
                        R$ {(
                          cart.reduce((total, item) => total + (item.price * item.quantity), 0) + 
                          (restaurant ? parseFloat(restaurant.deliveryFee) : 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4" 
              size="lg"
              onClick={onPlaceOrder}
              disabled={!checkoutInfo.address}
            >
              Confirmar pedido
            </Button>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h3 className="text-xl font-semibold mb-2">Pedido realizado com sucesso!</h3>
            <p className="text-gray-600">
              Seu pedido foi enviado para o restaurante e logo estará a caminho.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}